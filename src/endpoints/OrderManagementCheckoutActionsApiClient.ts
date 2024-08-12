import { Headers, type RequestInit } from 'node-fetch';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import type {
  CancelRequest,
  CancelResponse,
  DeliverRequest,
  DeliverResponse,
  OrderRequest,
  OrderResponse,
  ReturnRequest,
  ReturnResponse,
} from '../models/index.js';
import { BaseApiClient, CHECKOUT_ID_REQUIRED_ERROR, COMMERCE_CASE_ID_REQUIRED_ERROR, MERCHANT_ID_REQUIRED_ERROR } from './BaseApiClient.js';

export class OrderManagementCheckoutActionsApiClient extends BaseApiClient {
  constructor(config: CommunicatorConfiguration) {
    super(config);
  }

  public async createOrder(
    merchantId: string,
    commerceCaseId: string,
    checkoutId: string,
    payload: OrderRequest,
  ): Promise<OrderResponse> {
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
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/order`,
      this.getConfig().getHost(),
    );

    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    };

    return this.makeApiCall<OrderResponse>(url.toString(), requestInit);
  }

  public async deliverOrder(
    merchantId: string,
    commerceCaseId: string,
    checkoutId: string,
    payload: DeliverRequest,
  ): Promise<DeliverResponse> {
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
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/deliver`,
      this.getConfig().getHost(),
    );

    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    };

    return this.makeApiCall<DeliverResponse>(url.toString(), requestInit);
  }

  public async returnOrder(
    merchantId: string,
    commerceCaseId: string,
    checkoutId: string,
    payload: ReturnRequest,
  ): Promise<ReturnResponse> {
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
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/return`,
      this.getConfig().getHost(),
    );

    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    };

    return this.makeApiCall<ReturnResponse>(url.toString(), requestInit);
  }

  public async cancelOrder(
    merchantId: string,
    commerceCaseId: string,
    checkoutId: string,
    payload: CancelRequest,
  ): Promise<CancelResponse> {
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
      `/v1/${merchantId}/commerce-cases/${commerceCaseId}/checkouts/${checkoutId}/cancel`,
      this.getConfig().getHost(),
    );

    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    };

    return this.makeApiCall<CancelResponse>(url.toString(), requestInit);
  }
}
