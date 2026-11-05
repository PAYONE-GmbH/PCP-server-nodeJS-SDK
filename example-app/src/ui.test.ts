import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

import { describe, expect, it, vi } from 'vitest';

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
  const fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      routes: [
        { method: 'GET', path: '/api/commerce-cases/:commerceCaseId' },
        { method: 'PATCH', path: '/api/commerce-cases/:commerceCaseId' },
      ],
    }),
  });
  const source = await readFile(new URL('./ui.js', import.meta.url), 'utf8');
  const api = runInNewContext(`${source}\n({ demo, sendEditor });`, {
    document: {
      getElementById: get,
      createElement: () => new Element(),
      querySelectorAll: () => [],
    },
    fetch,
    performance,
    URLSearchParams,
  });
  await vi.waitFor(() => expect(get('connection').textContent).toContain('Verbunden'));
  fetch.mockReset();
  get('commerceCaseId').value = 'case-1';
  return { api, get, fetch };
}

describe('browser demo workflows', () => {
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
});
