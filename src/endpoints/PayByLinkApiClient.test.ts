import fetch from 'node-fetch';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import { AuthorizationMode, type CreatePayByLinkRequest, OrderType } from '../models/index.js';
import { createResponseMock } from '../testutils/mock-response.js';
import { PayByLinkApiClient } from './PayByLinkApiClient.js';

vi.mock('node-fetch', async (importOriginal) => ({
  ...(await importOriginal<typeof import('node-fetch')>()),
  default: vi.fn(),
}));

const mockedFetch = vi.mocked(fetch, true);

describe('PayByLinkApiClient', () => {
  const payload: CreatePayByLinkRequest = {
    paymentLinkSpecificInput: {
      authorizationMode: AuthorizationMode.PRE_AUTHORIZATION,
      paymentMethods: ['840'],
    },
    orderType: OrderType.Full,
    orderReferences: { merchantReference: 'order-123' },
  };
  let payByLinkApiClient: PayByLinkApiClient;

  beforeEach(() => {
    payByLinkApiClient = new PayByLinkApiClient(
      new CommunicatorConfiguration('apiKey', 'apiSecret', 'https://test.com'),
    );
  });

  afterEach(() => {
    mockedFetch.mockReset();
  });

  test('creates a pay-by-link request', async () => {
    const response = { paymentLinkId: 'link-123', redirectionUrl: 'https://pay.test/link-123' };
    mockedFetch.mockResolvedValueOnce(createResponseMock(201, response));

    await expect(
      payByLinkApiClient.createPayByLink('merchantId', 'commerceCaseId', 'checkoutId', payload),
    ).resolves.toEqual(response);
    expect(mockedFetch).toHaveBeenCalledWith(
      'https://test.com/v1/merchantId/commerce-cases/commerceCaseId/checkouts/checkoutId/pay-by-link',
      expect.objectContaining({ method: 'POST', body: JSON.stringify(payload) }),
    );
  });

  test('rejects missing path parameters', async () => {
    await expect(
      payByLinkApiClient.createPayByLink('', 'commerceCaseId', 'checkoutId', payload),
    ).rejects.toThrow('Merchant ID is required');
    await expect(
      payByLinkApiClient.createPayByLink('merchantId', '', 'checkoutId', payload),
    ).rejects.toThrow('Commerce Case ID is required');
    await expect(
      payByLinkApiClient.createPayByLink('merchantId', 'commerceCaseId', '', payload),
    ).rejects.toThrow('Checkout ID is required');
  });
});
