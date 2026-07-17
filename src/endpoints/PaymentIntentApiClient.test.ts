import fetch from 'node-fetch';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import type {
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
  PaymentIntentResponse,
} from '../models/index.js';
import { createResponseMock } from '../testutils/mock-response.js';
import { PaymentIntentApiClient } from './PaymentIntentApiClient.js';

vi.mock('node-fetch', async (importOriginal) => ({
  ...(await importOriginal<typeof import('node-fetch')>()),
  default: vi.fn(),
}));

const mockedFetch = vi.mocked(fetch, true);

describe('PaymentIntentApiClient', () => {
  let client: PaymentIntentApiClient;

  beforeEach(() => {
    client = new PaymentIntentApiClient(
      new CommunicatorConfiguration('apiKey', 'apiSecret', 'https://test.com'),
    );
  });

  test('creates a payment intent using the specified endpoint and payload', async () => {
    const payload: CreatePaymentIntentRequest = {
      amountOfMoney: { amount: 3720, currencyCode: 'EUR' },
    };
    const expectedResponse: CreatePaymentIntentResponse = {};
    mockedFetch.mockResolvedValueOnce(createResponseMock(201, expectedResponse));

    await expect(client.createPaymentIntent('merchantId', payload)).resolves.toEqual(
      expectedResponse,
    );

    expect(mockedFetch).toHaveBeenCalledWith(
      'https://test.com/v1/merchantId/payment-intents',
      expect.objectContaining({ method: 'POST', body: JSON.stringify(payload) }),
    );
  });

  test('gets a payment intent using the specified endpoint', async () => {
    const expectedResponse: PaymentIntentResponse = { paymentIntentId: 'payment-intent-id' };
    mockedFetch.mockResolvedValueOnce(createResponseMock(200, expectedResponse));

    await expect(client.getPaymentIntent('merchantId', 'payment-intent-id')).resolves.toEqual(
      expectedResponse,
    );

    expect(mockedFetch).toHaveBeenCalledWith(
      'https://test.com/v1/merchantId/payment-intents/payment-intent-id',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  test('rejects missing path parameters', async () => {
    await expect(client.createPaymentIntent('', {})).rejects.toThrow('Merchant ID is required');
    await expect(client.getPaymentIntent('merchantId', '')).rejects.toThrow(
      'Payment Intent ID is required',
    );
    await expect(client.getPaymentIntent('', 'payment-intent-id')).rejects.toThrow(
      'Merchant ID is required',
    );
  });
});
