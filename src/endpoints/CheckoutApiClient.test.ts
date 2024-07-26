import fetch from 'node-fetch';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import { CheckoutResponse } from '../models/CheckoutResponse.js';
import { CreateCheckoutRequest } from '../models/CreateCheckoutRequest.js';
import { CheckoutApiClient } from './CheckoutApiClient.js';
import { ErrorResponse } from '../models/ErrorResponse.js';
import { createResponseMock } from '../testutils/mock-response.js';
import { ApiErrorResponseException } from '../errors/ApiErrorResponseException.js';

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
      const expectedResponse = new CheckoutResponse();

      mockedFetch.mockResolvedValueOnce(createResponseMock<CheckoutResponse>(200, expectedResponse));

      const res = await checkoutApiClient.createCheckoutRequest(
        'merchantId',
        'commerceCaseId',
        new CreateCheckoutRequest(),
      );

      console.log({ res });

      expect(res).toEqual(expectedResponse);
    });
    test('given request was not successful, then return errorresponse', async () => {
      const expectedResponse = new ErrorResponse();

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await checkoutApiClient.createCheckoutRequest('merchantId', 'commerceCaseId', new CreateCheckoutRequest());
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
  });
});
