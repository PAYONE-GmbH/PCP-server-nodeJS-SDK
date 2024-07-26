import { Response } from 'node-fetch';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import { CheckoutApiClient } from './CheckoutApiClient.js';
import { CheckoutResponse } from '../models/CheckoutResponse.js';
import { CreateCheckoutRequest } from '../models/CreateCheckoutRequest.js';

describe('CheckoutApiClient', () => {
  let checkoutApiClient: CheckoutApiClient;

  beforeEach(() => {
    checkoutApiClient = new CheckoutApiClient(new CommunicatorConfiguration('apiKey', 'apiSecret', 'https://test.com'));
  });

  describe('createCheckoutRequest', () => {
    test('given request was successful, then return response', async () => {
      const expectedResponse = new CheckoutResponse();
      vi.spyOn(checkoutApiClient, 'getResponse').mockImplementationOnce(() => {
        return Promise.resolve(new Response(JSON.stringify(expectedResponse)));
      });

      const res = await checkoutApiClient.createCheckoutRequest(
        'merchantId',
        'commerceCaseId',
        new CreateCheckoutRequest(),
      );

      console.log({ res });

      expect(res).toBeDefined();
    });
  });
});
