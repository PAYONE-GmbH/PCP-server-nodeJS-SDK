import { expect, describe, test } from 'vitest';
import { CommunicatorConfiguration } from './CommunicatorConfiguration.js';

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
  });
});
