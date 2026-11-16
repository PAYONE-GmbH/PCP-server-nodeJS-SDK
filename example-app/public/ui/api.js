import { element, rememberIds } from './dom.js';
import { record } from './history.js';

export async function send(method, path, body) {
  const headers = {};
  const requestId = element('request-id').value.trim();
  if (requestId) headers['X-Request-ID'] = requestId;
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const started = performance.now();
  let response;
  let data;
  try {
    response = await fetch(path, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await response.text();
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }
  } catch (error) {
    record({
      method,
      path,
      request: { headers, body },
      status: 'Netzwerkfehler',
      ok: false,
      durationMs: Math.round(performance.now() - started),
      error: error.message,
    });
    throw error;
  }
  record({
    method,
    path,
    request: { headers, body },
    status: response.status,
    ok: response.ok,
    durationMs: Math.round(performance.now() - started),
    response: { headers: Object.fromEntries(response.headers), body: data },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} – Details in der Response.`);
  rememberIds(data);
  return data;
}

export async function discover() {
  const [discovery, defaults] = await Promise.all([fetch('/api'), fetch('/ui/config')]);
  if (!discovery.ok || !defaults.ok) throw new Error('Backend nicht erreichbar');
  return { routes: (await discovery.json()).routes, config: await defaults.json() };
}
