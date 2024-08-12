import fetch from 'node-fetch';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import {
  CartItemStatus,
  OrderType,
  type DeliverRequest,
  type DeliverResponse,
  type ErrorResponse,
  type OrderRequest,
  type OrderResponse,
  type ReturnResponse,
  type ReturnRequest,
  type CancelResponse,
  type CancelRequest,
  CancelType,
} from '../models/index.js';
import { createResponseMock, createEmptyErrorResponseMock } from '../testutils/mock-response.js';
import { ApiErrorResponseException } from '../errors/ApiErrorResponseException.js';
import { ApiResponseRetrievalException } from '../errors/ApiResponseRetrievalException.js';
import { OrderManagementCheckoutActionsApiClient } from './OrderManagementCheckoutActionsApiClient.js';

vi.mock('node-fetch', async importOriginal => {
  return {
    ...(await importOriginal<typeof import('node-fetch')>()),
    default: vi.fn(),
  };
});

const mockedFetch = vi.mocked(fetch, true);

describe('CheckoutApiClient', () => {
  let orderManagementCheckoutActionsApiClient: OrderManagementCheckoutActionsApiClient;

  beforeEach(() => {
    orderManagementCheckoutActionsApiClient = new OrderManagementCheckoutActionsApiClient(
      new CommunicatorConfiguration('apiKey', 'apiSecret', 'https://test.com'),
    );
  });

  describe('createOrder', () => {
    test('given request was successful, then return response', async () => {
      const expectedResponse: OrderResponse = {
        createPaymentResponse: {
          paymentExecutionId: 'paymentExecutionId',
        },
      };

      mockedFetch.mockResolvedValueOnce(createResponseMock<OrderResponse>(200, expectedResponse));

      const payload: OrderRequest = {
        orderType: OrderType.Full,
        items: [
          { id: '1', quantity: 2 },
          { id: '3', quantity: 1 },
        ],
      };
      const res = await orderManagementCheckoutActionsApiClient.createOrder(
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
        await orderManagementCheckoutActionsApiClient.createOrder('merchantId', 'commerceCaseId', 'checkoutId', {});
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), throw ApiResponseRetrievalException', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await orderManagementCheckoutActionsApiClient.createOrder('merchantId', 'commerceCaseId', 'checkoutId', {});
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required params is empty, throw an error', async () => {
      await expect(() =>
        orderManagementCheckoutActionsApiClient.createOrder('', 'commerceCaseId', 'checkoutId', {}),
      ).rejects.toThrow('Merchant ID is required');
      await expect(() =>
        orderManagementCheckoutActionsApiClient.createOrder('merchantId', '', 'checkoutId', {}),
      ).rejects.toThrow('Commerce Case ID is required');
      await expect(() =>
        orderManagementCheckoutActionsApiClient.createOrder('merchantId', 'commerceCaseId', '', {}),
      ).rejects.toThrow('Checkout ID is required');
    });
  });
  describe('deliverOrder', () => {
    const payload: DeliverRequest = {
      isFinal: false,
    };

    test('given request was successful, then return response', async () => {
      const expectedResponse: DeliverResponse = {
        capturePaymentResponse: {},
        shoppingCart: {
          items: [
            {
              invoiceData: { description: 'some nice thing' },
              orderLineDetails: {
                id: 'abc',
                status: [{ cartItemStatus: CartItemStatus.RETURNED, quantity: 1 }],
                productPrice: 1459,
                quantity: 1,
              },
            },
          ],
        },
      };

      mockedFetch.mockResolvedValueOnce(createResponseMock<DeliverResponse>(200, expectedResponse));

      const res = await orderManagementCheckoutActionsApiClient.deliverOrder(
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
        await orderManagementCheckoutActionsApiClient.deliverOrder(
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
        await orderManagementCheckoutActionsApiClient.deliverOrder(
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
        orderManagementCheckoutActionsApiClient.deliverOrder('', 'commerceCaseId', 'checkoutId', payload),
      ).rejects.toThrowError('Merchant ID is required');
      await expect(() =>
        orderManagementCheckoutActionsApiClient.deliverOrder('merchantId', '', 'checkoutId', payload),
      ).rejects.toThrowError('Commerce Case ID is required');
      await expect(() =>
        orderManagementCheckoutActionsApiClient.deliverOrder('merchantId', 'commerceCaseId', '', payload),
      ).rejects.toThrowError('Checkout ID is required');
    });
  });
  describe('returnOrder', () => {
    test('given request was successful, then return response', async () => {
      const expectedResponse: ReturnResponse = {
        returnPaymentResponse: {
          refundOutput: {
            amountOfMoney: { amount: 1199, currencyCode: 'EUR' },
            paymentMethod: 'cash',
          },
        },
      };

      mockedFetch.mockResolvedValueOnce(createResponseMock<ReturnResponse>(200, expectedResponse));
      const payload: ReturnRequest = {
        returnReason: 'not needed',
      };

      const res = await orderManagementCheckoutActionsApiClient.returnOrder(
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
        await orderManagementCheckoutActionsApiClient.returnOrder('merchantId', 'commerceCaseId', 'checkoutId', {});
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), then return errorresponse', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await orderManagementCheckoutActionsApiClient.returnOrder('merchantId', 'commerceCaseId', 'checkoutId', {});
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required param is empty, throw an error', async () => {
      await expect(() =>
        orderManagementCheckoutActionsApiClient.returnOrder('', 'commerceCaseId', 'checkoutId', {}),
      ).rejects.toThrowError('Merchant ID is required');
      await expect(() =>
        orderManagementCheckoutActionsApiClient.returnOrder('merchantId', '', 'checkoutId', {}),
      ).rejects.toThrowError('Commerce Case ID is required');
      await expect(() =>
        orderManagementCheckoutActionsApiClient.returnOrder('merchantId', 'commerceCaseId', '', {}),
      ).rejects.toThrowError('Checkout ID is required');
    });
  });
  describe('cancelOrder', () => {
    test('given request was successful, then return response', async () => {
      const expectedResponse: CancelResponse = {
        cancelPaymentResponse: {
          payment: {
            id: 'payed-id',
          },
        },
      };

      mockedFetch.mockResolvedValueOnce(createResponseMock<CancelResponse>(200, expectedResponse));
      const payload: CancelRequest = {
        cancelType: CancelType.FULL,
      };
      const res = await orderManagementCheckoutActionsApiClient.cancelOrder(
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
        await orderManagementCheckoutActionsApiClient.cancelOrder('merchantId', 'commerceCaseId', 'checkoutId', {});
      } catch (error) {
        expect(error).toEqual(new ApiErrorResponseException(400, JSON.stringify(expectedResponse)));
      }
    });
    test('given request was not successful (500), then return errorresponse', async () => {
      mockedFetch.mockResolvedValueOnce(createEmptyErrorResponseMock(500));

      expect.assertions(1);
      try {
        await orderManagementCheckoutActionsApiClient.cancelOrder('merchantId', 'commerceCaseId', 'checkoutId', {});
      } catch (error) {
        expect(error).toEqual(new ApiResponseRetrievalException(500, ''));
      }
    });
    test('a required param is empty, throw an error', async () => {
      await expect(() =>
        orderManagementCheckoutActionsApiClient.cancelOrder('', 'commerceCaseId', 'checkoutId', {}),
      ).rejects.toThrowError('Merchant ID is required');
      await expect(() =>
        orderManagementCheckoutActionsApiClient.cancelOrder('merchantId', '', 'checkoutId', {}),
      ).rejects.toThrowError('Commerce Case ID is required');
      await expect(() =>
        orderManagementCheckoutActionsApiClient.cancelOrder('merchantId', 'commerceCaseId', '', {}),
      ).rejects.toThrowError('Checkout ID is required');
    });
  });
});
