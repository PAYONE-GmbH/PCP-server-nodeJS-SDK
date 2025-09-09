import { describe, expect, test } from 'vitest';
import { CommunicatorConfiguration } from './CommunicatorConfiguration.js';
import type { FetchOptions } from './types/FetchOptions.js';

describe('CommunicatorConfiguration', () => {
  test('constructs', () => {
    const communicatorConfiguration = new CommunicatorConfiguration('', '', '');
    expect(communicatorConfiguration).toBeDefined();
  });

  test('initializes with correct values', () => {
    const apiKey = 'apiKey';
    const apiSecret = 'apiSecret';
    const host = 'host';
    const communicatorConfiguration = new CommunicatorConfiguration(apiKey, apiSecret, host);
    expect(communicatorConfiguration.getApiKey()).toBe(apiKey);
    expect(communicatorConfiguration.getApiSecret()).toBe(apiSecret);
    expect(communicatorConfiguration.getHost()).toBe(host);
    expect(communicatorConfiguration.getFetchOptions()).toBeUndefined();
  });

  test('initializes with fetch options', () => {
    const apiKey = 'apiKey';
    const apiSecret = 'apiSecret';
    const host = 'host';
    const fetchOptions: FetchOptions = {
      signal: AbortSignal.timeout(30000),
      headers: {
        'User-Agent': 'MyApp/1.0',
      },
    };

    const communicatorConfiguration = new CommunicatorConfiguration(apiKey, apiSecret, host, fetchOptions);
    expect(communicatorConfiguration.getApiKey()).toBe(apiKey);
    expect(communicatorConfiguration.getApiSecret()).toBe(apiSecret);
    expect(communicatorConfiguration.getHost()).toBe(host);
    expect(communicatorConfiguration.getFetchOptions()).toEqual(fetchOptions);
  });

  test('handles undefined fetch options', () => {
    const communicatorConfiguration = new CommunicatorConfiguration('key', 'secret', 'host', undefined);
    expect(communicatorConfiguration.getFetchOptions()).toBeUndefined();
  });
});
