import fetch from 'node-fetch';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import {
  PaymentChannel,
  PaymentType,
  type ErrorResponse,
  type PaymentInformationRequest,
  type PaymentInformationResponse,
} from '../models/index.js';
import { createResponseMock, createEmptyErrorResponseMock } from '../testutils/mock-response.js';
import { ApiErrorResponseException } from '../errors/ApiErrorResponseException.js';
import { ApiResponseRetrievalException } from '../errors/ApiResponseRetrievalException.js';
import { PaymentInformationApiClient } from './PaymentInformationApiClient.js';

vi.mock('node-fetch', async importOriginal => {
  return {
    ...(await importOriginal<typeof import('node-fetch')>()),
    default: vi.fn(),
  };
});

const mockedFetch = vi.mocked(fetch, true);

describe('PaymentInformationApiClient', () => {
  let paymentInformationApiClient: PaymentInformationApiClient;

  beforeEach(() => {
    paymentInformationApiClient = new PaymentInformationApiClient(
      new CommunicatorConfiguration('apiKey', 'apiSecret', 'https://test.com'),
    );
  });

  describe('createPaymentInformation', () => {
    const payload: PaymentInformationRequest = {
      amountOfMoney: {
        amount: 1289,
        currencyCode: 'EUR',
      },
      type: PaymentType.Sale,
      paymentProductId: 1331,
      paymentChannel: PaymentChannel.ECOMMERCE,
    };

    test('given request was successful, should return response', async () => {
      const expectedResponse: PaymentInformationResponse = {
        paymentChannel: PaymentChannel.POS,
        terminalId: 'terminalId',
        cardPaymentDetails: {
          maskedCardNumber: '672559XXXXXX1108',
          paymentProcessingToken: '0ca037cc-9079-4df7-8f6f-f2a3443ee521',
          reportingToken: '12a037cc-833d-8b45-8f6f-11c34171f4e1',
          cardAuthorizationId: '260042',
        },
        events: [],
      };

      mockedFetch.mockResolvedValueOnce(createResponseMock<PaymentInformationResponse>(200, expectedResponse));

      const res = await paymentInformationApiClient.createPaymentInformation(
        'merchantId',
        'commerceCaseId',
        'checkoutId',
        payload,
      );

      expect(res).toEqual(expectedResponse);
    });

    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await paymentInformationApiClient.createPaymentInformation(
          'merchantId',
          'commerceCaseId',
          'checkoutId',
          payload,
        );
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), then return errorresponse', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await paymentInformationApiClient.createPaymentInformation(
          'merchantId',
          'commerceCaseId',
          'checkoutId',
          payload,
        );
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required param is empty, throw an error', async () => {
      await expect(() =>
        paymentInformationApiClient.createPaymentInformation('', 'commerceCaseId', 'checkoutId', payload),
      ).rejects.toThrowError('Merchant ID is required');
      await expect(() =>
        paymentInformationApiClient.createPaymentInformation('merchantId', '', 'checkoutId', payload),
      ).rejects.toThrowError('Commerce Case ID is required');
      await expect(() =>
        paymentInformationApiClient.createPaymentInformation('merchantId', 'commerceCaseId', '', payload),
      ).rejects.toThrowError('Checkout ID is required');
    });
  });
  describe('getPaymentInformation', () => {
    test('given request was successful, should return response', async () => {
      const expectedResponse: PaymentInformationResponse = {
        commerceCaseId: 'commerceCaseId',
        checkoutId: 'checkoutId',
        paymentProductId: 4040,
      };

      mockedFetch.mockResolvedValueOnce(createResponseMock<PaymentInformationResponse>(200, expectedResponse));

      const res = await paymentInformationApiClient.getPaymentInformation(
        'merchantId',
        'commerceCaseId',
        'checkoutId',
        'paymentInformationId',
      );
      expect(res).toEqual(expectedResponse);
    });
    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await paymentInformationApiClient.getPaymentInformation(
          'merchantId',
          'commerceCaseId',
          'checkoutId',
          'paymentInformationId',
        );
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), then return errorresponse', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await paymentInformationApiClient.getPaymentInformation(
          'merchantId',
          'commerceCaseId',
          'checkoutId',
          'paymentInformationId',
        );
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required param is empty, throw an error', async () => {
      await expect(() =>
        paymentInformationApiClient.getPaymentInformation('', 'commerceCaseId', 'checkoutId', 'paymentInformationId'),
      ).rejects.toThrowError('Merchant ID is required');
      await expect(() =>
        paymentInformationApiClient.getPaymentInformation('merchantId', '', 'checkoutId', 'paymentInformationId'),
      ).rejects.toThrowError('Commerce Case ID is required');
      await expect(() =>
        paymentInformationApiClient.getPaymentInformation('merchantId', 'commerceCaseId', '', 'paymentInformationId'),
      ).rejects.toThrowError('Checkout ID is required');
      await expect(() =>
        paymentInformationApiClient.getPaymentInformation('merchantId', 'commerceCaseId', 'checkoutId', ''),
      ).rejects.toThrowError('Payment Information ID is required');
    });
  });
});
