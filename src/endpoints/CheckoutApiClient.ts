import { Headers, RequestInit } from 'node-fetch';
import { URLSearchParams } from 'url';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import {
  CheckoutResponse,
  CheckoutsResponse,
  CreateCheckoutRequest,
  CreateCheckoutResponse,
  PatchCheckoutRequest,
} from '../models/index.js';

import { GetCheckoutsQuery } from '../queries/index.js';
import { BaseApiClient } from './BaseApiClient.js';

export class CheckoutApiClient extends BaseApiClient {
  constructor(config: CommunicatorConfiguration) {
    super(config);
  }

  public async createCheckoutRequest(
    merchantId: string,
    commerceCaseId: string,
    payload: CreateCheckoutRequest,
  ): Promise<CreateCheckoutResponse> {
    if (!merchantId) {
      throw new Error('Merchant ID is required');
    }
    if (!commerceCaseId) {
      throw new Error('Commerce Case ID is required');
    }
    if (!payload) {
      throw new Error('Payload is required');
    }

    const url = new URL(`/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts`, this.getConfig().getHost());

    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    };

    return this.makeApiCall<CreateCheckoutResponse>(url.toString(), requestInit);
  }

  public async getCheckoutRequest(
    merchantId: string,
    commerceCaseId: string,
    checkoutId: string,
  ): Promise<CheckoutResponse> {
    if (!merchantId) {
      throw new Error('Merchant ID is required');
    }
    if (!commerceCaseId) {
      throw new Error('Commerce Case ID is required');
    }
    if (!checkoutId) {
      throw new Error('Checkout ID is required');
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}`,
      this.getConfig().getHost(),
    );

    const requestInit: RequestInit = {
      method: 'GET',
      headers: new Headers(),
    };

    return this.makeApiCall<CheckoutResponse>(url.toString(), requestInit);
  }

  public async getCheckoutsRequest(merchantId: string, queryParams?: GetCheckoutsQuery): Promise<CheckoutsResponse> {
    if (!merchantId) {
      throw new Error('Merchant ID is required');
    }

    const url = new URL(`/v1/${merchantId}/checkouts`, this.getConfig().getHost());

    if (queryParams) {
      const params = new URLSearchParams(queryParams.toQueryMap());
      url.search = params.toString();
    }

    const requestInit: RequestInit = {
      method: 'GET',
      headers: new Headers(),
    };

    return this.makeApiCall<CheckoutsResponse>(url.toString(), requestInit);
  }

  public async updateCheckoutRequest(
    merchantId: string,
    commerceCaseId: string,
    checkoutId: string,
    payload: PatchCheckoutRequest,
  ): Promise<void> {
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
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}`,
      this.getConfig().getHost(),
    );

    const requestInit: RequestInit = {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    };

    await this.makeApiCall(url.toString(), requestInit);
  }

  public async removeCheckoutRequest(merchantId: string, commerceCaseId: string, checkoutId: string): Promise<void> {
    if (!merchantId) {
      throw new Error('Merchant ID is required');
    }
    if (!commerceCaseId) {
      throw new Error('Commerce Case ID is required');
    }
    if (!checkoutId) {
      throw new Error('Checkout ID is required');
    }

    const url = new URL(
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}`,
      this.getConfig().getHost(),
    );

    const requestInit: RequestInit = {
      method: 'DELETE',
      headers: new Headers(),
    };

    await this.makeApiCall(url.toString(), requestInit);
  }
}
