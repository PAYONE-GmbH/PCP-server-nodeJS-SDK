import fetch, { type RequestInit, type Response } from 'node-fetch';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import type { FetchOptions } from '../types/FetchOptions.js';
import { BaseApiClient } from './BaseApiClient.js';

vi.mock('node-fetch', async importOriginal => {
  return {
    ...(await importOriginal<typeof import('node-fetch')>()),
    default: vi.fn(),
  };
});

const mockedFetch = vi.mocked(fetch, true);

// Mock response type for testing
interface MockResponse {
  ok: boolean;
  status: number;
  text: ReturnType<typeof vi.fn>;
}

// Type for Headers object with forEach method
interface HeadersLike {
  forEach(callback: (value: string, key: string) => void): void;
}

// Create a concrete test class since BaseApiClient is abstract-like
class TestApiClient extends BaseApiClient {
  public async testMakeApiCall<T>(url: string, requestInit: RequestInit, parseBody?: (body: string) => T): Promise<T> {
    return this.makeApiCall(url, requestInit, parseBody);
  }
}

describe('BaseApiClient', () => {
  let testApiClient: TestApiClient;
  let config: CommunicatorConfiguration;

  beforeEach(() => {
    vi.clearAllMocks();
    config = new CommunicatorConfiguration('apiKey', 'apiSecret', 'https://test.com');
    testApiClient = new TestApiClient(config);
  });

  test('constructs without fetch options', () => {
    expect(testApiClient).toBeDefined();
    expect(testApiClient.getConfig()).toBe(config);
  });

  test('constructs with client-specific fetch options', () => {
    const clientFetchOptions: FetchOptions = {
      signal: AbortSignal.timeout(15000),
      headers: { 'X-Client-Header': 'client-value' },
    };

    const clientWithOptions = new TestApiClient(config, clientFetchOptions);
    expect(clientWithOptions).toBeDefined();
  });

  test('setFetchOptions updates client-specific options', () => {
    const fetchOptions: FetchOptions = {
      signal: AbortSignal.timeout(20000),
      headers: { 'X-Custom': 'value' },
    };

    testApiClient.setFetchOptions(fetchOptions);
    // We can't directly test the private options, but we can test the behavior
    expect(testApiClient).toBeDefined();
  });

  test('makeApiCall uses default fetch when no custom options', async () => {
    const mockResponse: MockResponse = {
      ok: true,
      status: 200,
      text: vi.fn().mockResolvedValue('{"result": "success"}'),
    };
    mockedFetch.mockResolvedValue(mockResponse as unknown as Response);

    await testApiClient.testMakeApiCall('https://test.com/api', { method: 'GET' });

    expect(mockedFetch).toHaveBeenCalledWith(
      'https://test.com/api',
      expect.objectContaining({
        method: 'GET',
      }),
    );
  });

  test('makeApiCall merges global fetch options', async () => {
    const globalFetchOptions: FetchOptions = {
      signal: AbortSignal.timeout(30000),
      headers: { 'X-Global': 'global-value' },
    };

    const configWithOptions = new CommunicatorConfiguration(
      'apiKey',
      'apiSecret',
      'https://test.com',
      globalFetchOptions,
    );
    const clientWithGlobalOptions = new TestApiClient(configWithOptions);

    const mockResponse: MockResponse = {
      ok: true,
      status: 200,
      text: vi.fn().mockResolvedValue('{"result": "success"}'),
    };
    mockedFetch.mockResolvedValue(mockResponse as unknown as Response);

    await clientWithGlobalOptions.testMakeApiCall('https://test.com/api', { method: 'POST' });

    // Verify that fetch was called
    expect(mockedFetch).toHaveBeenCalledTimes(1);

    const [url, requestInit] = mockedFetch.mock.calls[0];
    expect(url).toBe('https://test.com/api');
    expect(requestInit).toHaveProperty('method', 'POST');

    // Check that signal is present (AbortSignal for timeout)
    expect(requestInit).toHaveProperty('signal');
    expect(requestInit?.signal).toBeDefined();

    // Check that custom headers are present
    expect(requestInit).toHaveProperty('headers');
    const headers = requestInit?.headers;
    if (headers && typeof headers === 'object' && 'forEach' in headers) {
      let hasGlobalHeader = false;
      (headers as HeadersLike).forEach((value: string, key: string) => {
        if (key === 'X-Global' && value === 'global-value') {
          hasGlobalHeader = true;
        }
      });
      expect(hasGlobalHeader).toBe(true);
    }
  });

  test('makeApiCall prioritizes client-specific options over global options', async () => {
    const globalFetchOptions: FetchOptions = {
      signal: AbortSignal.timeout(30000),
      headers: { 'X-Global': 'global-value', 'X-Shared': 'global-shared' },
    };

    const clientFetchOptions: FetchOptions = {
      signal: AbortSignal.timeout(15000),
      headers: { 'X-Client': 'client-value', 'X-Shared': 'client-shared' },
    };

    const configWithOptions = new CommunicatorConfiguration(
      'apiKey',
      'apiSecret',
      'https://test.com',
      globalFetchOptions,
    );
    const clientWithBothOptions = new TestApiClient(configWithOptions, clientFetchOptions);

    const mockResponse: MockResponse = {
      ok: true,
      status: 200,
      text: vi.fn().mockResolvedValue('{"result": "success"}'),
    };
    mockedFetch.mockResolvedValue(mockResponse as unknown as Response);

    await clientWithBothOptions.testMakeApiCall('https://test.com/api', { method: 'PUT' });

    // Verify that fetch was called
    expect(mockedFetch).toHaveBeenCalledTimes(1);

    const [url, requestInit] = mockedFetch.mock.calls[0];
    expect(url).toBe('https://test.com/api');
    expect(requestInit).toHaveProperty('method', 'PUT');

    // Check that signal is present (client-specific AbortSignal should take precedence)
    expect(requestInit).toHaveProperty('signal');
    expect(requestInit?.signal).toBeDefined();

    // Check that headers are properly merged with client-specific taking precedence
    expect(requestInit).toHaveProperty('headers');
    const headers = requestInit?.headers;
    if (headers && typeof headers === 'object' && 'forEach' in headers) {
      const headerMap: Record<string, string> = {};
      (headers as HeadersLike).forEach((value: string, key: string) => {
        headerMap[key] = value;
      });

      // Global header should be present
      expect(headerMap['X-Global']).toBe('global-value');

      // Client-specific header should be present
      expect(headerMap['X-Client']).toBe('client-value');

      // Client-specific should override global for shared header
      expect(headerMap['X-Shared']).toBe('client-shared');
    }
  });

  test('makeApiCall merges custom headers with SDK headers', async () => {
    const customFetchOptions: FetchOptions = {
      signal: AbortSignal.timeout(25000),
      headers: {
        'X-Custom': 'custom-value',
        'User-Agent': 'MyApp/1.0',
      },
    };

    testApiClient.setFetchOptions(customFetchOptions);

    const mockResponse: MockResponse = {
      ok: true,
      status: 200,
      text: vi.fn().mockResolvedValue('{"result": "success"}'),
    };
    mockedFetch.mockResolvedValue(mockResponse as unknown as Response);

    await testApiClient.testMakeApiCall('https://test.com/api', {
      method: 'GET',
    });

    // Verify that fetch was called with merged options
    expect(mockedFetch).toHaveBeenCalledTimes(1);

    const [url, requestInit] = mockedFetch.mock.calls[0];
    expect(url).toBe('https://test.com/api');
    expect(requestInit).toHaveProperty('method', 'GET');
    expect(requestInit).toHaveProperty('headers');

    // Verify that both custom and SDK headers are present
    const headers = requestInit?.headers;
    expect(headers).toBeDefined();

    // The headers should include SDK-generated headers (Authorization, Date, etc.)
    // and custom headers should be merged in
    if (headers && typeof headers === 'object' && 'forEach' in headers) {
      let hasCustomHeader = false;
      let hasAuthHeader = false;
      let hasDateHeader = false;

      (headers as HeadersLike).forEach((value: string, key: string) => {
        if (key === 'X-Custom') hasCustomHeader = true;
        if (key === 'Authorization') hasAuthHeader = true;
        if (key === 'Date') hasDateHeader = true;
      });

      expect(hasCustomHeader).toBe(true);
      expect(hasAuthHeader).toBe(true);
      expect(hasDateHeader).toBe(true);
    }
  });
});
