import { describe, expect, it } from 'vitest';
import { loadConfig } from '../src/config.js';

const credentials = { API_KEY: 'key', API_SECRET: 'secret', MERCHANT_ID: 'merchant-1' };

describe('environment configuration', () => {
  it('provides defaults and keeps UI values separate from credentials', () => {
    expect(loadConfig(credentials)).toMatchObject({
      apiKey: 'key', apiSecret: 'secret', merchantId: 'merchant-1',
      host: '0.0.0.0', port: 3000, corsOrigin: '*',
      apiHost: 'https://api.preprod.commerce.payone.com',
      uiDefaults: { commerceCaseId: undefined, checkoutId: undefined },
    });
  });

  it('reads explicit overrides', () => {
    expect(loadConfig({
      ...credentials, HOST: '127.0.0.1', PORT: '4000', API_HOST: 'http://localhost:9000',
      CORS_ORIGIN: 'https://client.example', COMMERCE_CASE_ID: 'case-1', CHECKOUT_ID: 'checkout-1',
    })).toMatchObject({
      host: '127.0.0.1', port: 4000, apiHost: 'http://localhost:9000',
      corsOrigin: 'https://client.example', uiDefaults: { commerceCaseId: 'case-1', checkoutId: 'checkout-1' },
    });
  });

  it.each(['API_KEY', 'API_SECRET', 'MERCHANT_ID'])('requires %s', (name) => {
    expect(() => loadConfig({ ...credentials, [name]: '' })).toThrow('Please provide');
  });

  it('rejects merchant IDs that could change the upstream path', () => {
    expect(() => loadConfig({ ...credentials, MERCHANT_ID: 'merchant/other' })).toThrow('MERCHANT_ID');
  });

  it.each(['0', '-1', '65536', '3.5', 'invalid', ''])('rejects invalid port %s', (port) => {
    expect(() => loadConfig({ ...credentials, PORT: port })).toThrow('PORT');
  });
});
