import { send } from './api.js';
import { element } from './dom.js';

export function createExplorer(routes) {
  function updateBodyState() {
    const route = routes[Number(element('operation').value)];
    element('body').disabled = !route || ['GET', 'DELETE'].includes(route.method);
  }

  function selectRoute(method, path, query = '', body = {}) {
    const index = routes.findIndex((route) => route.method === method && route.path === path);
    if (index < 0) throw new Error('Route nicht verfügbar');
    element('operation').value = String(index);
    element('query').value = query;
    element('body').value = JSON.stringify(body, null, 2);
    updateBodyState();
  }

  function resolvedPath(route) {
    return route.path.replace(/:([a-zA-Z]+)/g, (_, name) => {
      const value = element(name).value.trim();
      if (!/^[a-zA-Z0-9_-]+$/.test(value)) throw new Error(`Bitte eine gültige ${name} eingeben.`);
      return encodeURIComponent(value);
    });
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

  for (const [index, route] of routes.entries()) {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = `${route.method} ${route.path}`;
    element('operation').append(option);
  }
  element('route-count').textContent = `${routes.length} Operationen`;
  updateBodyState();
  return { selectRoute, resolvedPath, sendEditor, updateBodyState };
}
