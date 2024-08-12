import fetch, { type RequestInit } from 'node-fetch';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import { RequestHeaderGenerator } from '../RequestHeaderGenerator.js';
import { ApiErrorResponseException, ApiResponseRetrievalException } from '../errors/index.js';
import type { ErrorResponse } from '../models/ErrorResponse.js';

function isErrorResponse(parsed: unknown): parsed is ErrorResponse {
  if (typeof parsed !== 'object' || parsed === null) {
    return false;
  }
  const record = parsed as Record<string, unknown>;
  if (Object.prototype.hasOwnProperty.call(record, 'errorId') && typeof record['errorId'] !== 'string') {
    return false;
  }
  if (Object.prototype.hasOwnProperty.call(record, 'errorId') && !Array.isArray(record['errors'])) {
    return false;
  }
  return true;
}

export const MERCHANT_ID_REQUIRED_ERROR = 'Merchant ID is required';
export const COMMERCE_CASE_ID_REQUIRED_ERROR = 'Commerce Case ID is required';
export const CHECKOUT_ID_REQUIRED_ERROR = 'Checkout ID is required';

export class BaseApiClient {
  protected static parseVoid(): void {
    return;
  }

  protected static parseJson<T>(body: string): T {
    const parsed = JSON.parse(body);
    if (typeof parsed !== 'object' || parsed === null) {
      throw new TypeError('Parsed JSON is not an object');
    }
    return parsed as T;
  }

  protected readonly requestHeaderGenerator: RequestHeaderGenerator;
  protected readonly config: CommunicatorConfiguration;

  constructor(config: CommunicatorConfiguration) {
    this.config = config;
    this.requestHeaderGenerator = new RequestHeaderGenerator(config);
  }

  protected getRequestHeaderGenerator(): RequestHeaderGenerator | undefined {
    return this.requestHeaderGenerator;
  }

  protected getConfig(): CommunicatorConfiguration {
    return this.config;
  }

  protected async makeApiCall<T>(
    url: string,
    requestInit: RequestInit,
    parseBody: (body: string) => T = BaseApiClient.parseJson,
  ): Promise<T> {
    requestInit = this.requestHeaderGenerator.generateAdditionalRequestHeaders(url, requestInit);

    const response = await fetch(url, requestInit);

    const body = await response.text();
    let parsed: unknown;
    try {
      parsed = parseBody(body);
    } catch (error) {
      throw new ApiResponseRetrievalException(response.status, body, error instanceof Error ? error : undefined);
    }

    if (!response.ok) {
      if (isErrorResponse(parsed)) {
        throw new ApiErrorResponseException(response.status, body, parsed.errors ?? []);
      }
      throw new ApiResponseRetrievalException(response.status, body);
    }
    return parsed as Promise<T>;
  }
}
