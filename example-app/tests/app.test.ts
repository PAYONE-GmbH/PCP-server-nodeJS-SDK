import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';

import { CommunicatorConfiguration } from 'pcp-server-nodejs-sdk';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../src/app.js';

async function listen(server: Server): Promise<string> {
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  return `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
}

async function close(server: Server) {
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
}

const cc = '/commerce-cases/case-1';
const co = `${cc}/checkouts/checkout-1`;
const pe = `${co}/payment-executions/execution-1`;
const cases: [string, string][] = [
  ['POST', '/authentication-tokens'],
  ['POST', '/commerce-cases'],
  ['GET', '/commerce-cases'],
  ['GET', cc],
  ['PATCH', cc],
  ['POST', `${cc}/checkouts`],
  ['GET', '/checkouts'],
  ['GET', co],
  ['PATCH', co],
  ['DELETE', co],
  ['POST', `${co}/complete-order`],
  ['POST', `${co}/order`],
  ['POST', `${co}/deliver`],
  ['POST', `${co}/return`],
  ['POST', `${co}/cancel`],
  ['POST', `${co}/payment-executions`],
  ...['capture', 'cancel', 'refund', 'complete', 'pause', 'refresh'].map(
    (action): [string, string] => ['POST', `${pe}/${action}`],
  ),
  ['POST', `${pe}/events/event-1/fund-splits`],
  ['POST', `${co}/payment-information`],
  ['GET', `${co}/payment-information/info-1`],
  ['POST', `${co}/payment-information/info-1/refund`],
  ['POST', `${co}/pay-by-link`],
  ['POST', '/payment-intents'],
  ['GET', '/payment-intents/intent-1'],
  ['PATCH', '/payment-intents/intent-1'],
];

describe('client SDK test backend', () => {
  let upstream: Server;
  let backend: Server;
  let base: string;
  let status: number;
  let responseBody: string;
  const received: {
    method?: string;
    url?: string;
    body: string;
    authorization?: string;
    requestId?: string | string[];
  }[] = [];

  beforeAll(async () => {
    upstream = createServer(async (request, response) => {
      if (status === 0) {
        request.destroy();
        return;
      }
      let body = '';
      for await (const chunk of request) body += chunk;
      received.push({
        method: request.method,
        url: request.url,
        body,
        authorization: request.headers.authorization,
        requestId: request.headers['x-request-id'],
      });
      response.writeHead(status, { 'Content-Type': 'application/json' });
      response.end(responseBody);
    });
    const host = await listen(upstream);
    backend = createServer(createApp({
      configuration: new CommunicatorConfiguration('test-key', 'test-secret', host),
      merchantId: 'merchant-1',
      uiDefaults: { commerceCaseId: 'case-default', checkoutId: 'checkout-default' },
    }));
    base = await listen(backend);
  });

  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    status = 200;
    responseBody = '{"result":"ok"}';
    received.length = 0;
  });

  afterEach(() => { vi.restoreAllMocks(); });

  it('correlates request and response logs and masks secrets without changing HTTP data', async () => {
    responseBody = JSON.stringify({ token: 'response-secret', result: 'ok' });
    const response = await fetch(`${base}/api/commerce-cases?apiKey=query-secret`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': 'log-test',
        Authorization: 'Bearer header-secret',
      },
      body: JSON.stringify({
        merchantReference: 'visible-reference',
        nested: { apiSecret: 'body-secret', cardNumber: '4111111111111111' },
      }),
    });
    expect(await response.json()).toEqual({ token: 'response-secret', result: 'ok' });
    expect(response.headers.get('x-request-id')).toBe('log-test');
    const entries = vi.mocked(console.log).mock.calls.map(([line]) => JSON.parse(line));
    expect(entries).toHaveLength(2);
    expect(entries[0]).toMatchObject({
      event: 'request',
      requestId: 'log-test',
      method: 'POST',
      headers: { authorization: '[REDACTED]' },
      body: {
        merchantReference: 'visible-reference',
        nested: { apiSecret: '[REDACTED]', cardNumber: '[REDACTED]' },
      },
    });
    expect(entries[1]).toMatchObject({
      event: 'response',
      requestId: 'log-test',
      status: 200,
      body: { token: '[REDACTED]', result: 'ok' },
    });
    expect(entries[1].durationMs).toBeGreaterThanOrEqual(0);
    expect(JSON.stringify(entries)).not.toMatch(
      /query-secret|header-secret|body-secret|response-secret|4111111111111111/,
    );
    expect(JSON.parse(received[0].body).nested.apiSecret).toBe('body-secret');
  });

  it('logs error responses and generates a correlation ID', async () => {
    const response = await fetch(`${base}/missing`);
    await response.text();
    const entries = vi.mocked(console.log).mock.calls.map(([line]) => JSON.parse(line));
    expect(entries).toHaveLength(2);
    expect(entries[0].requestId).toBe(response.headers.get('x-request-id'));
    expect(entries[0].requestId).toBeTruthy();
    expect(entries[1]).toMatchObject({
      event: 'response',
      status: 404,
      body: { message: 'Route not found' },
    });
  });

  it('omits malformed request bodies from logs', async () => {
    const response = await fetch(`${base}/api/commerce-cases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{"apiSecret":"malformed-secret"',
    });
    await response.text();
    const entries = vi.mocked(console.log).mock.calls.map(([line]) => JSON.parse(line));
    expect(entries[0].body).toBe('[Non-JSON body omitted]');
    expect(entries[1].status).toBe(400);
    expect(JSON.stringify(entries)).not.toContain('malformed-secret');
  });

  afterAll(async () => {
    await close(backend);
    await close(upstream);
  });

  it.each(cases)('forwards %s %s through the signed SDK', async (method, path) => {
    const hasBody = method === 'POST' || method === 'PATCH';
    const isVoid =
      method === 'DELETE' || (method === 'PATCH' && !path.startsWith('/payment-intents'));
    if (isVoid) status = 204;
    const response = await fetch(`${base}/api${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', 'X-Request-ID': 'request-1' },
      body: hasBody ? JSON.stringify({ merchantReference: 'test-reference' }) : undefined,
    });
    expect(response.status).toBe(isVoid ? 204 : 200);
    expect(isVoid ? await response.text() : await response.json()).toEqual(
      isVoid ? '' : { result: 'ok' },
    );
    expect(received).toHaveLength(1);
    expect(received[0]).toMatchObject({ method, url: `/v1/merchant-1${path}` });
    expect(received[0].authorization).toContain('test-key');
    expect(received[0].authorization).not.toContain('test-secret');
    if (path === '/authentication-tokens') {
      expect(received[0].requestId).toBe('request-1');
      expect(received[0].body).toBe('');
    } else if (hasBody) {
      expect(JSON.parse(received[0].body)).toEqual({ merchantReference: 'test-reference' });
    }
  });

  it.each(['/commerce-cases', '/checkouts'])('preserves list filters for %s', async (path) => {
    const filters = '?offset=0&size=10&merchantReference=a%26b&includeCheckoutStatus=OPEN,PAID';
    expect((await fetch(`${base}/api${path}${filters}`)).status).toBe(200);
    const url = new URL(received[0].url ?? '', base);
    expect(Object.fromEntries(url.searchParams)).toEqual({
      offset: '0',
      size: '10',
      merchantReference: 'a&b',
      includeCheckoutStatus: 'OPEN,PAID',
    });
  });

  it('serves health, discovery and preflight without upstream calls', async () => {
    expect(await (await fetch(`${base}/health`)).json()).toEqual({ status: 'ok' });
    const discovery = await (await fetch(`${base}/api`)).json();
    expect(discovery.routes).toHaveLength(30);
    const ids: Record<string, string> = {
      commerceCaseId: 'case-1', checkoutId: 'checkout-1',
      paymentExecutionId: 'execution-1', paymentInformationId: 'info-1',
      paymentIntentId: 'intent-1', eventId: 'event-1',
    };
    const concreteRoutes = discovery.routes.map(({ method, path }: { method: string; path: string }) =>
      `${method} ${path.replace(/:([a-zA-Z]+)/g, (_match, name) => ids[name])}`);
    expect(concreteRoutes.sort()).toEqual(cases.map(([method, path]) => `${method} /api${path}`).sort());
    const response = await fetch(`${base}/api/commerce-cases`, { method: 'OPTIONS' });
    expect(response.status).toBe(204);
    expect(response.headers.get('access-control-allow-origin')).toBe('*');
    expect(response.headers.get('access-control-allow-methods')).toContain('PATCH');
    expect(received).toHaveLength(0);
  });

  it('serves the browser UI and only public configuration without upstream calls', async () => {
    const page = await fetch(base);
    expect(page.headers.get('content-type')).toContain('text/html');
    expect(await page.text()).toContain('SDK Test Backend');
    for (const [path, type] of [
      ['/ui/app.js', 'text/javascript'],
      ...['api', 'demos', 'dom', 'explorer', 'history'].map((name) => [`/ui/${name}.js`, 'text/javascript']),
      ['/ui/style.css', 'text/css'],
    ]) {
      const asset = await fetch(`${base}${path}`);
      expect(asset.status).toBe(200);
      expect(asset.headers.get('content-type')).toContain(type);
      expect((await asset.text()).length).toBeGreaterThan(100);
    }
    expect(await (await fetch(`${base}/ui/config`)).json()).toEqual({
      merchantId: 'merchant-1',
      commerceCaseId: 'case-default',
      checkoutId: 'checkout-default',
    });
    expect((await fetch(`${base}/ui/server.ts`)).status).toBe(404);
    expect(received).toHaveLength(0);
  });

  it.each([
    [400, '{"errors":[{"message":"invalid checkout"}]}'],
    [503, 'unavailable'],
  ])('preserves upstream error status %s', async (code, body) => {
    status = code;
    responseBody = body;
    const response = await fetch(`${base}/api/checkouts`);
    expect(response.status).toBe(code);
    expect(await response.json()).toEqual(
      code === 400 ? JSON.parse(body) : { message: 'PAYONE returned a non-JSON response' },
    );
  });

  it.each([
    '{',
    'null',
    '[]',
    '42',
  ])('rejects invalid JSON object %s before contacting PAYONE', async (body) => {
    const response = await fetch(`${base}/api/commerce-cases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    expect(response.status).toBe(400);
    expect(received).toHaveLength(0);
  });

  it('maps connection failures to a safe 502 response', async () => {
    status = 0;
    const response = await fetch(`${base}/api/commerce-cases`);
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ message: 'PAYONE request failed' });
  });

  it('accepts an omitted body as an empty SDK request object', async () => {
    const response = await fetch(`${base}/api/commerce-cases`, { method: 'POST' });
    expect(response.status).toBe(200);
    expect(received[0].body).toBe('{}');
  });

  it('rejects malformed path encoding before invoking the SDK', async () => {
    const response = await fetch(`${base}/api/commerce-cases/%ZZ`);
    expect(response.status).toBe(400);
    expect(received).toHaveLength(0);
  });

  it('rejects oversized bodies and unsupported content types', async () => {
    const large = await fetch(`${base}/api/commerce-cases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'x'.repeat(1024 * 1024) }),
    });
    expect(large.status).toBe(413);
    const text = await fetch(`${base}/api/commerce-cases`, { method: 'POST', body: '{}' });
    expect(text.status).toBe(415);
    expect(received).toHaveLength(0);
  });

  it('returns route errors and rejects URL separators in resource IDs', async () => {
    expect((await fetch(`${base}/missing`)).status).toBe(404);
    const method = await fetch(`${base}/api/checkouts`, { method: 'PUT' });
    expect(method.status).toBe(405);
    expect(method.headers.get('allow')).toContain('GET');
    expect((await fetch(`${base}/api/commerce-cases/case%2Fother`)).status).toBe(400);
    expect(received).toHaveLength(0);
  });
});
