import { Headers, type RequestInit } from 'node-fetch';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import type {
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
  PaymentIntentResponse,
} from '../models/index.js';
import { BaseApiClient, MERCHANT_ID_REQUIRED_ERROR } from './BaseApiClient.js';

const PAYMENT_INTENT_ID_REQUIRED_ERROR = 'Payment Intent ID is required';

export class PaymentIntentApiClient extends BaseApiClient {
  constructor(config: CommunicatorConfiguration) {
    super(config);
  }

  public async createPaymentIntent(
    merchantId: string,
    payload: CreatePaymentIntentRequest,
  ): Promise<CreatePaymentIntentResponse> {
    if (!merchantId) {
      throw new TypeError(MERCHANT_ID_REQUIRED_ERROR);
    }

    const url = new URL(`/v1/${merchantId}/payment-intents`, this.getConfig().getHost());
    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    };

    return this.makeApiCall<CreatePaymentIntentResponse>(url.toString(), requestInit);
  }

  public async getPaymentIntent(
    merchantId: string,
    paymentIntentId: string,
  ): Promise<PaymentIntentResponse> {
    if (!merchantId) {
      throw new TypeError(MERCHANT_ID_REQUIRED_ERROR);
    }
    if (!paymentIntentId) {
      throw new TypeError(PAYMENT_INTENT_ID_REQUIRED_ERROR);
    }

    const url = new URL(
      `/v1/${merchantId}/payment-intents/${paymentIntentId}`,
      this.getConfig().getHost(),
    );
    const requestInit: RequestInit = {
      method: 'GET',
      headers: new Headers(),
    };

    return this.makeApiCall<PaymentIntentResponse>(url.toString(), requestInit);
  }
}
