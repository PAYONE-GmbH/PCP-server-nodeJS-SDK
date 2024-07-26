import { Headers, RequestInit } from 'node-fetch';
import { URLSearchParams, URL } from 'url';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import {
  CommerceCaseResponse,
  CreateCommerceCaseRequest,
  CreateCommerceCaseResponse,
  Customer,
} from '../models/index.js';
import { GetCommerceCasesQuery } from '../queries/GetCommerceCasesQuery.js';
import { BaseApiClient } from './BaseApiClient.js';

export class CommerceCaseApiClient extends BaseApiClient {
  constructor(config: CommunicatorConfiguration) {
    super(config);
  }

  public async createCommerceCaseRequest(
    merchantId: string,
    payload: CreateCommerceCaseRequest,
  ): Promise<CreateCommerceCaseResponse> {
    if (!merchantId) {
      throw new Error('Merchant ID is required');
    }
    if (!payload) {
      throw new Error('Payload is required');
    }
    console.log(payload);
    const url = new URL(`/v1/${merchantId}/commerce-cases`, this.getConfig().getHost());

    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
      }),
      body: JSON.stringify(payload),
    };

    return this.makeApiCall<CreateCommerceCaseResponse>(url.toString(), requestInit);
  }

  public async getCommerceCaseRequest(merchantId: string, commerceCaseId: string): Promise<CommerceCaseResponse> {
    if (!merchantId) {
      throw new Error('Merchant ID is required');
    }
    if (!commerceCaseId) {
      throw new Error('Commerce Case ID is required');
    }

    const url = new URL(`/v1/${merchantId}/commerce-cases/${commerceCaseId}`, this.getConfig().getHost());

    const requestInit: RequestInit = {
      method: 'GET',
      headers: new Headers(),
    };

    return this.makeApiCall<CommerceCaseResponse>(url.toString(), requestInit);
  }

  public async getCommerceCasesRequest(
    merchantId: string,
    queryParams?: GetCommerceCasesQuery,
  ): Promise<CommerceCaseResponse[]> {
    if (!merchantId) {
      throw new Error('Merchant ID is required');
    }

    const url = new URL(`/v1/${merchantId}/commerce-cases`, this.getConfig().getHost());

    if (queryParams) {
      const params = new URLSearchParams(queryParams.toQueryMap());
      url.search = params.toString();
    }

    const requestInit: RequestInit = {
      method: 'GET',
      headers: new Headers(),
    };

    return this.makeApiCall<CommerceCaseResponse[]>(url.toString(), requestInit);
  }

  public async updateCommerceCaseRequest(
    merchantId: string,
    commerceCaseId: string,
    customer: Customer,
  ): Promise<void> {
    if (!merchantId) {
      throw new Error('Merchant ID is required');
    }
    if (!commerceCaseId) {
      throw new Error('Commerce Case ID is required');
    }
    if (!customer) {
      throw new Error('Customer is required');
    }

    const url = new URL(`/v1/${merchantId}/commerce-cases/${commerceCaseId}`, this.getConfig().getHost());

    const requestInit: RequestInit = {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ customer }),
    };

    await this.makeApiCall(url.toString(), requestInit);
  }
}
