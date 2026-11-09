import { randomUUID } from 'node:crypto';

import type { RequestHandler } from 'express';

const sensitiveKey =
  /authorization|cookie|secret|token|api[-_]?key|password|card|cvv|cvc|iban|accountnumber/i;
const maxBodyLength = 16 * 1024;

function sanitize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sanitize);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        sensitiveKey.test(key) ? '[REDACTED]' : sanitize(entry),
      ]),
    );
  }
  return value;
}

function bodyForLog(body: unknown): unknown {
  if (body === undefined || body === '') return null;
  let parsed = body;
  if (typeof body === 'string') {
    try {
      parsed = JSON.parse(body);
    } catch {
      return '[Non-JSON body omitted]';
    }
  }
  const sanitized = sanitize(parsed);
  if (JSON.stringify(sanitized).length > maxBodyLength) return '[Body exceeds 16 KiB; omitted]';
  return sanitized;
}

export const requestLogger: RequestHandler = (request, response, next) => {
  const started = performance.now();
  const suppliedId = request.headers['x-request-id'];
  const requestId = typeof suppliedId === 'string' ? suppliedId : randomUUID();
  const url = new URL(request.url ?? '/', 'http://localhost');
  for (const key of new Set(url.searchParams.keys())) {
    if (sensitiveKey.test(key)) url.searchParams.set(key, '[REDACTED]');
  }
  const context = { requestId, method: request.method, url: `${url.pathname}${url.search}` };
  response.setHeader('X-Request-ID', requestId);
  response.setHeader('Access-Control-Expose-Headers', 'X-Request-ID');
  let requestLogged = false;
  let responseBody: unknown;
  const logRequest = () => {
    if (requestLogged) return;
    requestLogged = true;
    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        event: 'request',
        ...context,
        headers: sanitize(request.headers),
        body: bodyForLog(response.locals.rawBody ?? request.body),
      }),
    );
    delete response.locals.rawBody;
  };
  const logResponse = (event: 'response' | 'response-aborted') => {
    logRequest();
    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        event,
        ...context,
        status: response.statusCode,
        durationMs: Math.round((performance.now() - started) * 100) / 100,
        headers: sanitize(response.getHeaders()),
        body: bodyForLog(responseBody),
      }),
    );
  };
  response.once('finish', () => logResponse('response'));
  response.once('close', () => {
    if (!response.writableFinished) logResponse('response-aborted');
  });
  const originalJson = response.json;
  response.json = function (body) {
    logRequest();
    responseBody = body;
    return originalJson.call(this, body);
  };
  next();
};
