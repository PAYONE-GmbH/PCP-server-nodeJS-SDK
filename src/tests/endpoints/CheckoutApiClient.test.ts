import fetch from 'node-fetch';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { CommunicatorConfiguration } from '../../CommunicatorConfiguration.js';
import type { CheckoutResponse, ErrorResponse } from '../../models/index.js';
import { CheckoutApiClient } from '../../endpoints/CheckoutApiClient.js';
import { createResponseMock } from '../mock-response.js';
import { ApiErrorResponseException } from '../../errors/ApiErrorResponseException.js';

vi.mock('node-fetch', async importOriginal => {
  return {
    ...(await importOriginal<typeof import('node-fetch')>()),
    default: vi.fn(),
  };
});

const mockedFetch = vi.mocked(fetch, true);

describe('CheckoutApiClient', () => {
  let checkoutApiClient: CheckoutApiClient;

  beforeEach(() => {
    checkoutApiClient = new CheckoutApiClient(new CommunicatorConfiguration('apiKey', 'apiSecret', 'https://test.com'));
  });

  describe('createCheckoutRequest', () => {
    test('given request was successful, then return response', async () => {
      const expectedResponse: CheckoutResponse = {};

      mockedFetch.mockResolvedValueOnce(createResponseMock<CheckoutResponse>(200, expectedResponse));

      const res = await checkoutApiClient.createCheckoutRequest('merchantId', 'commerceCaseId', {});

      console.log({ res });

      expect(res).toEqual(expectedResponse);
    });
    test('given request was not successful, then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = {};

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await checkoutApiClient.createCheckoutRequest('merchantId', 'commerceCaseId', {});
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
  });
});
