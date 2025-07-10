import fetch from 'node-fetch';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import { AuthenticationApiClient } from './AuthenticationApiClient.js';
import type { AuthenticationToken } from '../models/index.js';
import { createResponseMock } from '../testutils/mock-response.js';
import { Headers, type RequestInit } from 'node-fetch';

const mockedFetch = vi.mocked(fetch, true);

vi.mock('node-fetch', async importOriginal => {
  return {
    ...(await importOriginal<typeof import('node-fetch')>()),
    default: vi.fn(),
  };
});

describe('AuthenticationApiClient', () => {
  let authenticationApiClient: AuthenticationApiClient;
  beforeEach(() => {
    authenticationApiClient = new AuthenticationApiClient(
      new CommunicatorConfiguration('dummy-key', 'dummy-secret', 'https://api.testhost.com'),
    );
  });

  afterEach(() => {
    mockedFetch.mockReset();
  });

  test('should throw if merchantId is missing', async () => {
    await expect(authenticationApiClient.getAuthenticationTokens('')).rejects.toThrow('Merchant ID is required');
  });

  test('should return token for valid merchantId', async () => {
    const mockToken: AuthenticationToken = {
      token: 'jwt-token',
      id: 'uuid-123',
      creationDate: new Date().toISOString(),
      expirationDate: new Date(Date.now() + 600000).toISOString(),
    };
    mockedFetch.mockResolvedValueOnce(createResponseMock(200, mockToken));
    const result = await authenticationApiClient.getAuthenticationTokens('merchant-123');
    expect(result.token).toBe('jwt-token');
    expect(result.id).toBe('uuid-123');
    expect(result.creationDate).toBeDefined();
    expect(result.expirationDate).toBeDefined();
  });

  test('should pass X-Request-ID header if provided', async () => {
    const mockToken: AuthenticationToken = {
      token: 'jwt-token',
      id: 'uuid-123',
      creationDate: new Date().toISOString(),
      expirationDate: new Date(Date.now() + 600000).toISOString(),
    };
    let receivedRequest: RequestInit | undefined;
    mockedFetch.mockImplementationOnce((url, req) => {
      receivedRequest = req;
      return Promise.resolve(createResponseMock(200, mockToken));
    });
    const requestId = 'request-id-123';
    await authenticationApiClient.getAuthenticationTokens('merchant-123', requestId);
    // Check the Headers object for the header
    expect(
      receivedRequest?.headers instanceof Headers
        ? (receivedRequest.headers as Headers).get('X-Request-ID')
        : undefined,
    ).toBe(requestId);
  });
});
