import fetch from 'node-fetch';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import { CommerceCaseApiClient } from '../endpoints/CommerceCaseApiClient.js';
import { createResponseMock, createEmptyErrorResponseMock } from '../testutils/mock-response.js';
import { ApiErrorResponseException } from '../errors/ApiErrorResponseException.js';
import { ApiResponseRetrievalException } from '../errors/ApiResponseRetrievalException.js';
import type { CreateCommerceCaseResponse } from '../models/CreateCommerceCaseResponse.js';
import type { ErrorResponse } from '../models/ErrorResponse.js';
import type { CommerceCaseResponse } from '../models/CommerceCaseResponse.js';
import type { Customer } from '../models/Customer.js';
import { GetCommerceCasesQuery } from '../queries/GetCommerceCasesQuery.js';

vi.mock('node-fetch', async importOriginal => {
  return {
    ...(await importOriginal<typeof import('node-fetch')>()),
    default: vi.fn(),
  };
});

const mockedFetch = vi.mocked(fetch, true);

describe('CheckoutApiClient', () => {
  let commerceCaseApiClient: CommerceCaseApiClient;

  beforeEach(() => {
    commerceCaseApiClient = new CommerceCaseApiClient(
      new CommunicatorConfiguration('apiKey', 'apiSecret', 'https://test.com'),
    );
  });

  describe('createCommerceCaseRequest', () => {
    test('given request was successful, then return response', async () => {
      const expectedResponse: CreateCommerceCaseResponse = {
        commerceCaseId: 'id-5513',
        customer: {
          businessRelation: 'B2C',
          billingAddress: {
            countryCode: 'DE',
            zip: '40474',
            city: 'Düsseldorf',
            street: 'Cecilienallee',
            houseNumber: '2',
          },
        },
        checkout: {
          checkoutId: 'checkout-101',
          amountOfMoney: { currencyCode: 'EUR', amount: 1445 },
        },
      };

      mockedFetch.mockResolvedValueOnce(createResponseMock(200, expectedResponse));

      const payload: CreateCommerceCaseResponse = {
        merchantReference: 'id-from-shop-45',
        customer: {
          businessRelation: 'B2C',
          billingAddress: {
            countryCode: 'DE',
            zip: '40474',
            city: 'Düsseldorf',
            street: 'Cecilienallee',
            houseNumber: '2',
          },
        },
      };
      const res = await commerceCaseApiClient.createCommerceCaseRequest('merchantId', payload);

      expect(res).toEqual(expectedResponse);
    });
    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await commerceCaseApiClient.createCommerceCaseRequest('merchantId', {});
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), throw ApiResponseRetrievalException', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await commerceCaseApiClient.createCommerceCaseRequest('merchantId', {});
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required params is empty, throw an error', () => {
      expect(() => commerceCaseApiClient.createCommerceCaseRequest('', {})).rejects.toThrow('Merchant ID is required');
    });
  });
  describe('getCommerceCaseRequest', () => {
    test('given request was successful, then return response', async () => {
      const expectedResponse: CommerceCaseResponse = {
        commerceCaseId: 'id-4499',
        customer: {
          businessRelation: 'B2B',
          billingAddress: {
            countryCode: 'DE',
            zip: '24113',
            city: 'Kiel',
            street: 'Krummbogen',
            houseNumber: '82a',
          },
        },
        checkouts: [],
      };

      mockedFetch.mockResolvedValueOnce(createResponseMock(200, expectedResponse));

      const res = await commerceCaseApiClient.getCommerceCaseRequest('merchantId', 'commerceCaseId');

      expect(res).toEqual(expectedResponse);
    });
    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await commerceCaseApiClient.getCommerceCaseRequest('merchantId', 'commerceCaseId');
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), throw ApiResponseRetrievalException', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await commerceCaseApiClient.getCommerceCaseRequest('merchantId', 'commerceCaseId');
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required params is empty, throw an error', () => {
      expect(() => commerceCaseApiClient.getCommerceCaseRequest('', 'commerceCaseId')).rejects.toThrow(
        'Merchant ID is required',
      );
      expect(() => commerceCaseApiClient.getCommerceCaseRequest('merchantId', '')).rejects.toThrow(
        'Commerce Case ID is required',
      );
    });
  });
  describe('getCommerceCasesRequest', () => {
    test('given request was successful, then return response', async () => {
      const expectedResponse: CommerceCaseResponse[] = [
        {
          commerceCaseId: 'id-4499',
          checkouts: [
            {
              commerceCaseId: 'id-4499',
              creationDateTime: '2024-12-24T12:34:56Z',
            },
          ],
        },
      ];

      mockedFetch.mockResolvedValueOnce(createResponseMock(200, expectedResponse));

      const queryParams = new GetCommerceCasesQuery();
      queryParams.setOffset(0);
      queryParams.setSize(10);
      queryParams.setCommerceCaseId('commerceCaseId');
      const res = await commerceCaseApiClient.getCommerceCasesRequest('merchantId', queryParams);

      expect(res).toEqual(expectedResponse);
    });
    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await commerceCaseApiClient.getCommerceCasesRequest('merchantId');
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), throw ApiResponseRetrievalException', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await commerceCaseApiClient.getCommerceCasesRequest('merchantId');
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required params is empty, throw an error', () => {
      expect(() => commerceCaseApiClient.getCommerceCasesRequest('')).rejects.toThrow('Merchant ID is required');
    });
  });
  describe('updateCommerceCaseRequest', () => {
    test('given request was successful, then return response', async () => {
      mockedFetch.mockResolvedValueOnce(createResponseMock(204));

      const customer: Customer = {
        locale: '',
      };
      await commerceCaseApiClient.updateCommerceCaseRequest('merchantId', 'commerceCaseId', customer);
    });
    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await commerceCaseApiClient.updateCommerceCaseRequest('merchantId', 'commerceCaseId', {});
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), throw ApiResponseRetrievalException', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await commerceCaseApiClient.updateCommerceCaseRequest('merchantId', 'commerceCaseId', {});
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required params is empty, throw an error', () => {
      expect(() => commerceCaseApiClient.updateCommerceCaseRequest('', 'commerceCaseId', {})).rejects.toThrow(
        'Merchant ID is required',
      );
      expect(() => commerceCaseApiClient.updateCommerceCaseRequest('merchantId', '', {})).rejects.toThrow(
        'Commerce Case ID is required',
      );
    });
  });
});
