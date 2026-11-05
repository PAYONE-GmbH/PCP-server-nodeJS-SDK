import { readFile } from 'node:fs/promises';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';

import { ApiException, type CommunicatorConfiguration } from 'pcp-server-nodejs-sdk';
import { createHttpLogger } from './logger.js';
import { createRoutes } from './routes.js';

class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

async function readBody(
  request: IncomingMessage,
  logRequest: (body?: string) => void,
): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 1024 * 1024) {
      request.resume();
      throw new HttpError(413, 'JSON body exceeds 1 MiB');
    }
    chunks.push(Buffer.from(chunk));
  }
  const rawBody = Buffer.concat(chunks).toString('utf8');
  logRequest(rawBody);
  if (size === 0) return {};
  if (request.headers['content-type']?.split(';')[0].trim() !== 'application/json') {
    throw new HttpError(415, 'Use Content-Type: application/json');
  }
  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    throw new HttpError(400, 'Invalid JSON body');
  }
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    throw new HttpError(400, 'JSON body must be an object');
  }
  return body as Record<string, unknown>;
}

function send(response: ServerResponse, status: number, body?: unknown) {
  response.statusCode = status;
  if (body === undefined) {
    response.end();
  } else {
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(JSON.stringify(body));
  }
}

function matchPath(template: string, pathname: string): Record<string, string> | undefined {
  const expected = template.split('/');
  const actual = pathname.replace(/\/$/, '').split('/');
  if (expected.length !== actual.length) return undefined;
  const params: Record<string, string> = {};
  for (let index = 0; index < expected.length; index++) {
    const part = expected[index];
    if (!part.startsWith(':')) {
      if (part !== actual[index]) return undefined;
      continue;
    }
    let value: string;
    try {
      value = decodeURIComponent(actual[index]);
    } catch {
      throw new HttpError(400, 'Invalid path encoding');
    }
    // IDs are interpolated into SDK URLs: reject separators and traversal characters.
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) throw new HttpError(400, 'Invalid resource ID');
    params[part.slice(1)] = value;
  }
  return params;
}

export function createTestServer(
  config: CommunicatorConfiguration,
  merchantId: string,
  corsOrigin = '*',
  uiDefaults: { commerceCaseId?: string; checkoutId?: string } = {},
) {
  const routes = createRoutes(config, merchantId);
  const assets = new Map([
    ['/', ['ui.html', 'text/html; charset=utf-8']],
    ['/ui/app.js', ['ui.js', 'text/javascript; charset=utf-8']],
    ['/ui/style.css', ['ui.css', 'text/css; charset=utf-8']],
  ]);
  return createServer(async (request, response) => {
    const logger = createHttpLogger(request, response);
    const respond = (status: number, body?: unknown) => {
      logger.request();
      logger.response(body);
      send(response, status, body);
    };
    response.setHeader('Access-Control-Allow-Origin', corsOrigin);
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Request-ID');
    response.setHeader('Cache-Control', 'no-store');
    try {
      if (request.method === 'OPTIONS') return respond(204);
      const url = new URL(request.url ?? '/', 'http://localhost');
      const asset = assets.get(url.pathname);
      if (request.method === 'GET' && asset) {
        const content = await readFile(new URL(asset[0], import.meta.url), 'utf8');
        logger.request();
        logger.response(undefined);
        response.statusCode = 200;
        response.setHeader('Content-Type', asset[1]);
        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.end(content);
        return;
      }
      if (request.method === 'GET' && url.pathname === '/ui/config') {
        return respond(200, {
          merchantId,
          commerceCaseId: uiDefaults.commerceCaseId,
          checkoutId: uiDefaults.checkoutId,
        });
      }
      if (request.method === 'GET' && url.pathname === '/health') {
        return respond(200, { status: 'ok' });
      }
      if (request.method === 'GET' && url.pathname === '/api') {
        return respond(200, {
          routes: routes.map(({ method, path }) => ({ method, path })),
        });
      }
      const matches = routes.flatMap((route) => {
        const params = matchPath(route.path, url.pathname);
        return params ? [{ route, params }] : [];
      });
      const match = matches.find(({ route }) => route.method === request.method);
      if (!match) {
        if (matches.length) {
          response.setHeader(
            'Allow',
            [...matches.map(({ route }) => route.method), 'OPTIONS'].join(', '),
          );
          throw new HttpError(405, 'Method not allowed');
        }
        throw new HttpError(404, 'Route not found');
      }
      const payload = await readBody(request, logger.request);
      const requestId = request.headers['x-request-id'];
      const result = await match.route.handle({
        params: match.params,
        body: <T>() => payload as T,
        url,
        requestId: typeof requestId === 'string' ? requestId : undefined,
      });
      respond(result === undefined ? 204 : 200, result);
    } catch (error) {
      if (error instanceof HttpError) return respond(error.status, { message: error.message });
      if (error instanceof ApiException) {
        const status = error.getStatusCode();
        let body: unknown;
        try {
          body = JSON.parse(error.getResponseBody());
        } catch {
          body = { message: 'PAYONE returned a non-JSON response' };
        }
        return respond(status >= 400 && status <= 599 ? status : 502, body);
      }
      respond(502, { message: 'PAYONE request failed' });
    }
  });
}
