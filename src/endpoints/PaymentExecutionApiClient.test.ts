import fetch from 'node-fetch';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import {
  CancellationReason,
  StatusValue,
  type CancelPaymentRequest,
  type CancelPaymentResponse,
  type CapturePaymentRequest,
  type CapturePaymentResponse,
  type CompletePaymentRequest,
  type CompletePaymentResponse,
  type CreatePaymentResponse,
  type ErrorResponse,
  type PaymentExecutionRequest,
  type RefundPaymentResponse,
  type RefundRequest,
} from '../models/index.js';
import { createResponseMock, createEmptyErrorResponseMock } from '../testutils/mock-response.js';
import { ApiErrorResponseException } from '../errors/ApiErrorResponseException.js';
import { ApiResponseRetrievalException } from '../errors/ApiResponseRetrievalException.js';
import { PaymentExecutionApiClient } from './PaymentExecutionApiClient.js';

vi.mock('node-fetch', async importOriginal => {
  return {
    ...(await importOriginal<typeof import('node-fetch')>()),
    default: vi.fn(),
  };
});

const mockedFetch = vi.mocked(fetch, true);

describe('PaymentExecutionApiClient', () => {
  let paymentExecutionApiClient: PaymentExecutionApiClient;

  beforeEach(() => {
    paymentExecutionApiClient = new PaymentExecutionApiClient(
      new CommunicatorConfiguration('apiKey', 'apiSecret', 'https://test.com'),
    );
  });

  describe('createPayment', () => {
    test('given request was successful, should return response', async () => {
      const expectedResponse: CreatePaymentResponse = {};

      mockedFetch.mockResolvedValueOnce(createResponseMock<CreatePaymentResponse>(200, expectedResponse));

      const payload: PaymentExecutionRequest = {
        paymentExecutionSpecificInput: {
          paymentReferences: { merchantReference: 'invoice-123' },
          amountOfMoney: { amount: 3720, currencyCode: 'EUR' },
        },
      };
      const res = await paymentExecutionApiClient.createPayment('merchantId', 'commerceCaseId', 'checkoutId', payload);

      expect(res).toEqual(expectedResponse);
    });
    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await paymentExecutionApiClient.createPayment('merchantId', 'commerceCaseId', 'checkoutId', {});
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), throw ApiResponseRetrievalException', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await paymentExecutionApiClient.createPayment('merchantId', 'commerceCaseId', 'checkoutId', {});
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required param is empty, throw an error', async () => {
      await expect(() =>
        paymentExecutionApiClient.createPayment('', 'commerceCaseId', 'checkoutId', {}),
      ).rejects.toThrowError('Merchant ID is required');
      await expect(() =>
        paymentExecutionApiClient.createPayment('merchantId', '', 'checkoutId', {}),
      ).rejects.toThrowError('Commerce Case ID is required');
      await expect(() =>
        paymentExecutionApiClient.createPayment('merchantId', 'commerceCaseId', '', {}),
      ).rejects.toThrowError('Checkout ID is required');
    });
  });
  describe('capturePayment', () => {
    test('given request was successful, should return response', async () => {
      const expectedResponse: CapturePaymentResponse = {};

      mockedFetch.mockResolvedValueOnce(createResponseMock<CapturePaymentResponse>(200, expectedResponse));

      const payload: CapturePaymentRequest = {
        isFinal: true,
        delivery: {
          items: [],
        },
      };
      const res = await paymentExecutionApiClient.capturePayment(
        'merchantId',
        'commerceCaseId',
        'checkoutId',
        'paymentId',
        payload,
      );

      expect(res).toEqual(expectedResponse);
    });
    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await paymentExecutionApiClient.capturePayment('merchantId', 'commerceCaseId', 'checkoutId', 'paymentId', {
          isFinal: false,
        });
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), throw ApiResponseRetrievalException', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await paymentExecutionApiClient.capturePayment('merchantId', 'commerceCaseId', 'checkoutId', 'paymentId', {
          isFinal: false,
        });
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required param is empty, throw an error', async () => {
      await expect(() =>
        paymentExecutionApiClient.capturePayment('', 'commerceCaseId', 'checkoutId', 'paymentId', { isFinal: false }),
      ).rejects.toThrowError('Merchant ID is required');
      await expect(() =>
        paymentExecutionApiClient.capturePayment('merchantId', '', 'checkoutId', 'paymentId', { isFinal: false }),
      ).rejects.toThrowError('Commerce Case ID is required');
      await expect(() =>
        paymentExecutionApiClient.capturePayment('merchantId', 'commerceCaseId', '', 'paymentId', { isFinal: false }),
      ).rejects.toThrowError('Checkout ID is required');
      await expect(() =>
        paymentExecutionApiClient.capturePayment('merchantId', 'commerceCaseId', 'checkoutId', '', { isFinal: false }),
      ).rejects.toThrowError('Payment Execution ID is required');
    });
  });
  describe('cancelPayment', () => {
    test('given request was successful, should return response', async () => {
      const expectedResponse: CancelPaymentResponse = {
        payment: {
          status: StatusValue.Cancelled,
          statusOutput: {
            isCancellable: false,
            isRefundable: false,
          },
        },
      };

      mockedFetch.mockResolvedValueOnce(createResponseMock<CancelPaymentResponse>(200, expectedResponse));

      const payload: CancelPaymentRequest = {
        cancellationReason: CancellationReason.CONSUMER_REQUEST,
      };
      const res = await paymentExecutionApiClient.cancelPayment(
        'merchantId',
        'commerceCaseId',
        'checkoutId',
        'paymentId',
        payload,
      );
      expect(res).toEqual(expectedResponse);
    });
    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await paymentExecutionApiClient.cancelPayment('merchantId', 'commerceCaseId', 'checkoutId', 'paymentId', {});
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), throw ApiResponseRetrievalException', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await paymentExecutionApiClient.cancelPayment('merchantId', 'commerceCaseId', 'checkoutId', 'paymentId', {});
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required param is empty, throw an error', async () => {
      await expect(() =>
        paymentExecutionApiClient.cancelPayment('', 'commerceCaseId', 'checkoutId', 'paymentId', {}),
      ).rejects.toThrowError('Merchant ID is required');
      await expect(() =>
        paymentExecutionApiClient.cancelPayment('merchantId', '', 'checkoutId', 'paymentId', {}),
      ).rejects.toThrowError('Commerce Case ID is required');
      await expect(() =>
        paymentExecutionApiClient.cancelPayment('merchantId', 'commerceCaseId', '', 'paymentId', {}),
      ).rejects.toThrowError('Checkout ID is required');
      await expect(() =>
        paymentExecutionApiClient.cancelPayment('merchantId', 'commerceCaseId', 'checkoutId', '', {}),
      ).rejects.toThrowError('Payment Execution ID is required');
    });
  });
  describe('refundPayment', () => {
    test('given request was successful, should return response', async () => {
      const expectedResponse: RefundPaymentResponse = {
        status: StatusValue.Refunded,
        statusOutput: {
          isCancellable: false,
          isRefundable: false,
          isAuthorized: true,
        },
      };

      mockedFetch.mockResolvedValueOnce(createResponseMock<RefundPaymentResponse>(200, expectedResponse));

      const payload: RefundRequest = {
        return: {
          returnReason: 'Customer unhappy',
        },
      };
      const res = await paymentExecutionApiClient.refundPayment(
        'merchantId',
        'commerceCaseId',
        'checkoutId',
        'paymentId',
        payload,
      );
      expect(res).toEqual(expectedResponse);
    });
    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await paymentExecutionApiClient.refundPayment('merchantId', 'commerceCaseId', 'checkoutId', 'paymentId', {});
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), throw ApiResponseRetrievalException', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await paymentExecutionApiClient.refundPayment('merchantId', 'commerceCaseId', 'checkoutId', 'paymentId', {});
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required param is empty, throw an error', async () => {
      await expect(() =>
        paymentExecutionApiClient.refundPayment('', 'commerceCaseId', 'checkoutId', 'paymentId', {}),
      ).rejects.toThrowError('Merchant ID is required');
      await expect(() =>
        paymentExecutionApiClient.refundPayment('merchantId', '', 'checkoutId', 'paymentId', {}),
      ).rejects.toThrowError('Commerce Case ID is required');
      await expect(() =>
        paymentExecutionApiClient.refundPayment('merchantId', 'commerceCaseId', '', 'paymentId', {}),
      ).rejects.toThrowError('Checkout ID is required');
      await expect(() =>
        paymentExecutionApiClient.refundPayment('merchantId', 'commerceCaseId', 'checkoutId', '', {}),
      ).rejects.toThrowError('Payment Execution ID is required');
    });
  });
  describe('completePayment', () => {
    test('given request was successful, should return response', async () => {
      const expectedResponse: CompletePaymentResponse = {
        merchantAction: {
          actionType: 'REDIRECT',
          redirectData: {
            redirectURL: 'https://redirect.com',
          },
        },
      };

      mockedFetch.mockResolvedValueOnce(createResponseMock<CompletePaymentResponse>(200, expectedResponse));

      const payload: CompletePaymentRequest = {
        order: {
          amountOfMoney: { amount: 3720, currencyCode: 'EUR' },
          references: {
            merchantReference: 'order-5001',
          },
        },
        device: {
          ipAddress: '0.0.0.0',
          deviceToken: 'tokentokentoken',
        },
      };

      const res = await paymentExecutionApiClient.completePayment(
        'merchantId',
        'commerceCaseId',
        'checkoutId',
        'paymentId',
        payload,
      );
      expect(res).toEqual(expectedResponse);
    });
    test('given request was not successful (400), then return errorresponse', async () => {
      const expectedResponse: ErrorResponse = { errorId: 'error-id' };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ErrorResponse>(400, expectedResponse));

      expect.assertions(1);
      try {
        await paymentExecutionApiClient.completePayment('merchantId', 'commerceCaseId', 'checkoutId', 'paymentId', {});
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), throw ApiResponseRetrievalException', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await paymentExecutionApiClient.completePayment('merchantId', 'commerceCaseId', 'checkoutId', 'paymentId', {});
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required param is empty, throw an error', async () => {
      await expect(() =>
        paymentExecutionApiClient.completePayment('', 'commerceCaseId', 'checkoutId', 'paymentId', {}),
      ).rejects.toThrowError('Merchant ID is required');
      await expect(() =>
        paymentExecutionApiClient.completePayment('merchantId', '', 'checkoutId', 'paymentId', {}),
      ).rejects.toThrowError('Commerce Case ID is required');
      await expect(() =>
        paymentExecutionApiClient.completePayment('merchantId', 'commerceCaseId', '', 'paymentId', {}),
      ).rejects.toThrowError('Checkout ID is required');
      await expect(() =>
        paymentExecutionApiClient.completePayment('merchantId', 'commerceCaseId', 'checkoutId', '', {}),
      ).rejects.toThrowError('Payment Execution ID is required');
    });
  });
});
