const element = (id) => document.getElementById(id);
const idNames = [
  'commerceCaseId',
  'checkoutId',
  'paymentExecutionId',
  'paymentInformationId',
  'paymentIntentId',
  'eventId',
];
let routes = [];
let busy = false;

for (const name of idNames) {
  const wrapper = document.createElement('div');
  const label = document.createElement('label');
  label.htmlFor = name;
  label.textContent = name;
  const input = document.createElement('input');
  input.id = name;
  input.placeholder = name;
  wrapper.append(label, input);
  element('ids').append(wrapper);
}

function selectRoute(method, path, query = '', body = {}) {
  const index = routes.findIndex((route) => route.method === method && route.path === path);
  if (index < 0) throw new Error('Route nicht verfügbar');
  element('operation').value = String(index);
  element('query').value = query;
  element('body').value = JSON.stringify(body, null, 2);
  updateBodyState();
}

function updateBodyState() {
  const route = routes[Number(element('operation').value)];
  element('body').disabled = !route || ['GET', 'DELETE'].includes(route.method);
}

function resolvedPath(route) {
  return route.path.replace(/:([a-zA-Z]+)/g, (_, name) => {
    const value = element(name).value.trim();
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) throw new Error(`Bitte eine gültige ${name} eingeben.`);
    return encodeURIComponent(value);
  });
}

function rememberIds(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return;
  for (const name of idNames) {
    if (typeof body[name] === 'string') element(name).value = body[name];
  }
}

function record(entry) {
  const details = document.createElement('details');
  details.open = true;
  const summary = document.createElement('summary');
  summary.textContent = `${entry.status} · ${entry.method} ${entry.path} · ${entry.durationMs} ms`;
  if (!entry.ok) summary.className = 'error';
  const pre = document.createElement('pre');
  pre.textContent = JSON.stringify(entry, null, 2);
  details.append(summary, pre);
  const history = element('history');
  for (const previous of history.children) previous.open = false;
  history.prepend(details);
  while (history.children.length > 20) history.lastElementChild.remove();
}

async function send(method, path, body) {
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

async function sendEditor() {
  const route = routes[Number(element('operation').value)];
  if (!route) throw new Error('Bitte eine Operation auswählen.');
  const path = resolvedPath(route);
  const query = element('query').value.trim().replace(/^\?/, '');
  let body;
  if (!['GET', 'DELETE'].includes(route.method)) {
    try {
      body = JSON.parse(element('body').value);
    } catch {
      throw new Error('Der Body enthält kein gültiges JSON.');
    }
    if (!body || typeof body !== 'object' || Array.isArray(body))
      throw new Error('Der Body muss ein JSON-Objekt sein.');
  }
  return send(route.method, `${path}${query ? `?${new URLSearchParams(query)}` : ''}`, body);
}

async function run(action) {
  if (busy) return;
  busy = true;
  for (const button of document.querySelectorAll('button')) button.disabled = true;
  element('feedback').className = '';
  element('feedback').textContent = 'Request läuft …';
  try {
    await action();
    element('feedback').textContent = 'Erfolgreich abgeschlossen.';
  } catch (error) {
    element('feedback').className = 'error';
    element('feedback').textContent = error.message;
  } finally {
    busy = false;
    for (const button of document.querySelectorAll('button')) button.disabled = false;
  }
}

async function demo(action) {
  const casePath = '/api/commerce-cases/:commerceCaseId';
  if (action === 'token') selectRoute('POST', '/api/authentication-tokens');
  if (action === 'create') selectRoute('POST', '/api/commerce-cases');
  if (action === 'list') selectRoute('GET', '/api/commerce-cases', 'offset=2&size=1');
  if (action === 'get' || action === 'city') selectRoute('GET', casePath);
  if (action === 'city') {
    const city = element('city').value.trim();
    if (!city) throw new Error('Bitte eine Stadt eingeben.');
    const path = resolvedPath({ path: casePath });
    const current = await send('GET', path);
    if (!current?.customer?.billingAddress)
      throw new Error('Der Commerce Case hat keine customer.billingAddress.');
    selectRoute('PATCH', casePath, '', {
      customer: {
        ...current.customer,
        billingAddress: { ...current.customer.billingAddress, city },
      },
    });
  }
  await sendEditor();
}

element('operation').addEventListener('change', updateBodyState);
element('request-form').addEventListener('submit', (event) => {
  event.preventDefault();
  run(sendEditor);
});
for (const button of document.querySelectorAll('[data-demo]')) {
  button.addEventListener('click', () => run(() => demo(button.dataset.demo)));
}
element('clear').addEventListener('click', () => {
  element('history').replaceChildren();
  element('feedback').textContent = 'Verlauf geleert.';
});

async function initialize() {
  try {
    const [discovery, defaults] = await Promise.all([fetch('/api'), fetch('/ui/config')]);
    if (!discovery.ok || !defaults.ok) throw new Error('Backend nicht erreichbar');
    routes = (await discovery.json()).routes;
    const config = await defaults.json();
    for (const name of idNames) element(name).value = config[name] ?? '';
    for (const [index, route] of routes.entries()) {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = `${route.method} ${route.path}`;
      element('operation').append(option);
    }
    element('route-count').textContent = `${routes.length} Operationen`;
    element('connection').textContent = `Verbunden · Merchant ${config.merchantId}`;
    updateBodyState();
  } catch (error) {
    element('connection').textContent = error.message;
    element('connection').className = 'error';
  }
}

initialize();
