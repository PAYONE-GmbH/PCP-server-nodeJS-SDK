import { afterEach, describe, expect, it, vi } from 'vitest';

// Minimal DOM for exercising the actual browser script's request workflows.
class Element {
  value = '';
  textContent = '';
  children: Element[] = [];
  disabled = false;
  open = false;
  append(...children: Element[]) {
    this.children.push(...children);
  }
  prepend(child: Element) {
    this.children.unshift(child);
  }
  addEventListener() {}
}

async function browser() {
  const elements = new Map<string, Element>();
  const get = (id: string) => {
    if (!elements.has(id)) elements.set(id, new Element());
    return elements.get(id)!;
  };
  get('city').value = 'New York';
  const fetch = vi.fn();
  vi.stubGlobal('fetch', fetch);
  vi.stubGlobal('document', {
    getElementById: get,
    createElement: () => new Element(),
    querySelectorAll: () => [],
  });
  // Exercise the browser's native modules directly, without evaluating source strings.
  const { createExplorer } = await import('../public/ui/explorer.js');
  const { demo } = await import('../public/ui/demos.js');
  const explorer = createExplorer([
        { method: 'GET', path: '/api/commerce-cases/:commerceCaseId' },
        { method: 'PATCH', path: '/api/commerce-cases/:commerceCaseId' },
  ]);
  const api = { demo: (action: string) => demo(action, explorer), sendEditor: explorer.sendEditor };
  get('commerceCaseId').value = 'case-1';
  return { api, get, fetch };
}

describe('browser demo workflows', () => {
  afterEach(() => { vi.unstubAllGlobals(); });
  it('fetches the customer before updating the city and preserves all other customer fields', async () => {
    const { api, fetch } = await browser();
    const customer = {
      merchantCustomerId: 'customer-1',
      billingAddress: { city: 'Berlin', zip: '10115', countryCode: 'DE' },
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Map(),
      text: async () => JSON.stringify({ customer }),
    });
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 204,
      headers: new Map(),
      text: async () => '',
    });
    await api.demo('city');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch.mock.calls[0]).toEqual([
      '/api/commerce-cases/case-1',
      { method: 'GET', headers: {}, body: undefined },
    ]);
    expect(fetch.mock.calls[1][1].method).toBe('PATCH');
    expect(JSON.parse(fetch.mock.calls[1][1].body)).toEqual({
      customer: { ...customer, billingAddress: { ...customer.billingAddress, city: 'New York' } },
    });
  });

  it('does not update when the existing billing address is missing', async () => {
    const { api, fetch } = await browser();
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Map(),
      text: async () => '{}',
    });
    await expect(api.demo('city')).rejects.toThrow('customer.billingAddress');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('rejects missing IDs and malformed JSON before sending a request', async () => {
    const { api, get, fetch } = await browser();
    get('commerceCaseId').value = '';
    await expect(api.demo('get')).rejects.toThrow('commerceCaseId');
    get('commerceCaseId').value = 'case-1';
    get('operation').value = '1';
    get('body').value = '{';
    await expect(api.sendEditor()).rejects.toThrow('gültiges JSON');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('does not update when fetching the current customer fails', async () => {
    const { api, fetch } = await browser();
    fetch.mockResolvedValueOnce({
      ok: false, status: 404, headers: new Map(), text: async () => '{"message":"not found"}',
    });
    await expect(api.demo('city')).rejects.toThrow('HTTP 404');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('bootstraps discovery and defaults through the module entry point', async () => {
    const { get, fetch } = await browser();
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ routes: [] }) });
    fetch.mockResolvedValueOnce({
      ok: true, json: async () => ({ merchantId: 'merchant-1', commerceCaseId: 'case-default' }),
    });
    await import('../public/ui/app.js');
    await vi.waitFor(() => expect(get('connection').textContent).toBe('Verbunden · Merchant merchant-1'));
    expect(get('commerceCaseId').value).toBe('case-default');
    expect(fetch.mock.calls.map(([url]) => url)).toEqual(['/api', '/ui/config']);
  });
});
