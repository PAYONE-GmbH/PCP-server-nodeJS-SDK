import { Headers, type RequestInit } from 'node-fetch';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import type { PaymentInformationRequest, PaymentInformationResponse } from '../models/index.js';
import {
  BaseApiClient,
  CHECKOUT_ID_REQUIRED_ERROR,
  COMMERCE_CASE_ID_REQUIRED_ERROR,
  MERCHANT_ID_REQUIRED_ERROR,
} from './BaseApiClient.js';

const PAYMENT_INFORMATION_ID_REQUIRED_ERROR = 'Payment Information ID is required';

export class PaymentInformationApiClient extends BaseApiClient {
  constructor(config: CommunicatorConfiguration) {
    super(config);
  }

  public async createPaymentInformation(
    merchantId: string,
    commerceCaseId: string,
    checkoutId: string,
    payload: PaymentInformationRequest,
  ): Promise<PaymentInformationResponse> {
    if (!merchantId) {
      throw new TypeError(MERCHANT_ID_REQUIRED_ERROR);
    }
    if (!commerceCaseId) {
      throw new TypeError(COMMERCE_CASE_ID_REQUIRED_ERROR);
    }
    if (!checkoutId) {
      throw new TypeError(CHECKOUT_ID_REQUIRED_ERROR);
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/payment-informations`,
      this.getConfig().getHost(),
    );

    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    };

    return this.makeApiCall<PaymentInformationResponse>(url.toString(), requestInit);
  }

  public async getPaymentInformation(
    merchantId: string,
    commerceCaseId: string,
    checkoutId: string,
    paymentInformationId: string,
  ): Promise<PaymentInformationResponse> {
    if (!merchantId) {
      throw new TypeError(MERCHANT_ID_REQUIRED_ERROR);
    }
    if (!commerceCaseId) {
      throw new TypeError(COMMERCE_CASE_ID_REQUIRED_ERROR);
    }
    if (!checkoutId) {
      throw new TypeError(CHECKOUT_ID_REQUIRED_ERROR);
    }
    if (!paymentInformationId) {
      throw new TypeError(PAYMENT_INFORMATION_ID_REQUIRED_ERROR);
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/payment-informations/${paymentInformationId}`,
      this.getConfig().getHost(),
    );

    const requestInit: RequestInit = {
      method: 'GET',
      headers: new Headers(),
    };

    return this.makeApiCall<PaymentInformationResponse>(url.toString(), requestInit);
  }
}
