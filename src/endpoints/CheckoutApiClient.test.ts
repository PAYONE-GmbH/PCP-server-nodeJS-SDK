import fetch from 'node-fetch';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import {
  StatusCheckout,
  type CheckoutResponse,
  type CheckoutsResponse,
  type CreateCheckoutResponse,
  type ErrorResponse,
  type PatchCheckoutRequest,
} from '../models/index.js';
import { CheckoutApiClient } from '../endpoints/CheckoutApiClient.js';
import { createResponseMock, createEmptyErrorResponseMock } from '../testutils/mock-response.js';
import { ApiErrorResponseException } from '../errors/ApiErrorResponseException.js';
import { ApiResponseRetrievalException } from '../errors/ApiResponseRetrievalException.js';
import { GetCheckoutsQuery } from '../queries/GetCheckoutsQuery.js';

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
      const expectedResponse: CreateCheckoutResponse = {
        checkoutId: 'checkoutId',
        amountOfMoney: {
          currencyCode: 'USD',
          amount: 799,
        },
        shoppingCart: {
          items: [{ invoiceData: { description: 'A smoothie' }, orderLineDetails: { productPrice: 799, quantity: 1 } }],
        },
      };

      mockedFetch.mockResolvedValueOnce(createResponseMock<CreateCheckoutResponse>(200, expectedResponse));

      const res = await checkoutApiClient.createCheckoutRequest('merchantId', 'commerceCaseId', {});

      expect(res).toEqual(expectedResponse);
    });
    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await checkoutApiClient.createCheckoutRequest('merchantId', 'commerceCaseId', {});
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), throw ApiResponseRetrievalException', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await checkoutApiClient.createCheckoutRequest('merchantId', 'commerceCaseId', {});
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required params is empty, throw an error', async () => {
      await expect(() => checkoutApiClient.createCheckoutRequest('', 'commerceCaseId', {})).rejects.toThrow(
        'Merchant ID is required',
      );
      await expect(() => checkoutApiClient.createCheckoutRequest('merchantId', '', {})).rejects.toThrow(
        'Commerce Case ID is required',
      );
    });
  });
  describe('getCheckoutRequest', () => {
    test('given request was successful, then return response', async () => {
      const expectedResponse: CheckoutResponse = {
        commerceCaseId: 'commerceCaseId',
        checkoutId: 'checkoutId',
        merchantCustomerId: 'cust-1234',
        references: { merchantReference: 'com-12345' },
        amountOfMoney: { currencyCode: 'YEN', amount: 1000 },
        checkoutStatus: StatusCheckout.Open,
      };

      mockedFetch.mockResolvedValueOnce(createResponseMock<CheckoutResponse>(200, expectedResponse));

      const res = await checkoutApiClient.getCheckoutRequest('merchantId', 'commerceCaseId', 'checkoutId');

      expect(res).toEqual(expectedResponse);
    });
    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await checkoutApiClient.getCheckoutRequest('merchantId', 'commerceCaseId', 'checkoutId');
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), throw ApiResponseRetrievalException', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await checkoutApiClient.getCheckoutRequest('merchantId', 'commerceCaseId', 'checkoutId');
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required params is empty, throw an error', async () => {
      await expect(() => checkoutApiClient.getCheckoutRequest('', 'commerceCaseId', 'checkoutId')).rejects.toThrow(
        'Merchant ID is required',
      );
      await expect(() => checkoutApiClient.getCheckoutRequest('merchantId', '', 'checkoutId')).rejects.toThrow(
        'Commerce Case ID is required',
      );
      await expect(() => checkoutApiClient.getCheckoutRequest('merchantId', 'commerceCaseId', '')).rejects.toThrow(
        'Checkout ID is required',
      );
    });
  });
  describe('getCheckoutsRequest', () => {
    const queryParams = new GetCheckoutsQuery();
    queryParams.setSize(20);
    queryParams.setOffset(60);
    queryParams.setCheckoutId('checkoutId');

    test('given request was successful, then return response', async () => {
      const expectedResponse: CheckoutsResponse = {
        numberOfCheckouts: 1,
        checkouts: [
          {
            commerceCaseId: 'commerceCaseId',
            checkoutId: 'checkoutId',
            merchantCustomerId: 'cust-1100',
            amountOfMoney: { currencyCode: 'USD', amount: 1250 },
          },
        ],
      };

      mockedFetch.mockResolvedValueOnce(createResponseMock(200, expectedResponse));

      const res = await checkoutApiClient.getCheckoutsRequest('merchantId', queryParams);

      expect(res).toEqual(expectedResponse);
    });
    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await checkoutApiClient.getCheckoutsRequest('merchantId', queryParams);
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), throw ApiResponseRetrievalException', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await checkoutApiClient.getCheckoutsRequest('merchantId', queryParams);
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required params is empty, throw an error', async () => {
      await expect(() => checkoutApiClient.getCheckoutsRequest('')).rejects.toThrow('Merchant ID is required');
    });
  });
  describe('updateCheckoutRequest', async () => {
    const payload: PatchCheckoutRequest = {
      amountOfMoney: { currencyCode: 'YEN', amount: 1000 },
    };
    test('given request was successful, then return response', async () => {
      mockedFetch.mockResolvedValueOnce(createResponseMock(200, undefined));

      const res = await checkoutApiClient.updateCheckoutRequest('merchantId', 'commerceCaseId', 'checkoutId', payload);

      expect(res).toEqual(undefined);
    });
    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await checkoutApiClient.updateCheckoutRequest('merchantId', 'commerceCaseId', 'checkoutId', payload);
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), throw ApiResponseRetrievalException', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await checkoutApiClient.updateCheckoutRequest('merchantId', 'commerceCaseId', 'checkoutId', payload);
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required params is empty, throw an error', async () => {
      await expect(() =>
        checkoutApiClient.updateCheckoutRequest('', 'commerceCaseId', 'checkoutId', payload),
      ).rejects.toThrow('Merchant ID is required');
      await expect(() => checkoutApiClient.updateCheckoutRequest('merchantId', '', 'checkoutId', payload)).rejects.toThrow(
        'Commerce Case ID is required',
      );
      await expect(() =>
        checkoutApiClient.updateCheckoutRequest('merchantId', 'commerceCaseId', '', payload),
      ).rejects.toThrow('Checkout ID is required');
    });
  });
  describe('removeCheckoutRequest', async () => {
    test('given request was successful, then return response', async () => {
      mockedFetch.mockResolvedValueOnce(createResponseMock(200, undefined));

      const res = await checkoutApiClient.removeCheckoutRequest('merchantId', 'commerceCaseId', 'checkoutId');

      expect(res).toEqual(undefined);
    });
    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await checkoutApiClient.removeCheckoutRequest('merchantId', 'commerceCaseId', 'checkoutId');
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), throw ApiResponseRetrievalException', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await checkoutApiClient.removeCheckoutRequest('merchantId', 'commerceCaseId', 'checkoutId');
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required params is empty, throw an error', async () => {
      await expect(() => checkoutApiClient.removeCheckoutRequest('', 'commerceCaseId', 'checkoutId')).rejects.toThrow(
        'Merchant ID is required',
      );
      await expect(() => checkoutApiClient.removeCheckoutRequest('merchantId', '', 'checkoutId')).rejects.toThrow(
        'Commerce Case ID is required',
      );
      await expect(() => checkoutApiClient.removeCheckoutRequest('merchantId', 'commerceCaseId', '')).rejects.toThrow(
        'Checkout ID is required',
      );
    });
  });
});
