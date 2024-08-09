import { Headers, type RequestInit } from 'node-fetch';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import type { PaymentInformationRequest, PaymentInformationResponse } from '../models/index.js';
import { BaseApiClient } from './BaseApiClient.js';

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
      throw new Error('Merchant ID is required');
    }
    if (!commerceCaseId) {
      throw new Error('Commerce Case ID is required');
    }
    if (!checkoutId) {
      throw new Error('Checkout ID is required');
    }
    if (!payload) {
      throw new Error('Payload is required');
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/payment-informations`,
      this.getConfig()?.getHost(),
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
      throw new Error('Merchant ID is required');
    }
    if (!commerceCaseId) {
      throw new Error('Commerce Case ID is required');
    }
    if (!checkoutId) {
      throw new Error('Checkout ID is required');
    }
    if (!paymentInformationId) {
      throw new Error('Payment Information ID is required');
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/payment-informations/${paymentInformationId}`,
      this.getConfig()?.getHost(),
    );

    const requestInit: RequestInit = {
      method: 'GET',
      headers: new Headers(),
    };

    return this.makeApiCall<PaymentInformationResponse>(url.toString(), requestInit);
  }
}
