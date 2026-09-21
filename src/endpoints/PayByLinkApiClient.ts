import { Headers, type RequestInit } from 'node-fetch';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import type { CreatePayByLinkRequest, CreatePayByLinkResponse } from '../models/index.js';
import {
  BaseApiClient,
  CHECKOUT_ID_REQUIRED_ERROR,
  COMMERCE_CASE_ID_REQUIRED_ERROR,
  MERCHANT_ID_REQUIRED_ERROR,
} from './BaseApiClient.js';

export class PayByLinkApiClient extends BaseApiClient {
  constructor(config: CommunicatorConfiguration) {
    super(config);
  }

  public async createPayByLink(
    merchantId: string,
    commerceCaseId: string,
    checkoutId: string,
    payload: CreatePayByLinkRequest,
  ): Promise<CreatePayByLinkResponse> {
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
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/pay-by-link`,
      this.getConfig().getHost(),
    );
    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    };

    return this.makeApiCall<CreatePayByLinkResponse>(url.toString(), requestInit);
  }
}
