import fetch, { type RequestInit } from 'node-fetch';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import { RequestHeaderGenerator } from '../RequestHeaderGenerator.js';
import { ApiErrorResponseException, ApiResponseRetrievalException } from '../errors/index.js';
import type { ErrorResponse } from '../models/ErrorResponse.js';
import type { FetchOptions } from '../types/FetchOptions.js';

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
  private clientFetchOptions?: FetchOptions;

  constructor(config: CommunicatorConfiguration, clientFetchOptions?: FetchOptions) {
    this.config = config;
    this.requestHeaderGenerator = new RequestHeaderGenerator(config);
    this.clientFetchOptions = clientFetchOptions;
  }

  protected getRequestHeaderGenerator(): RequestHeaderGenerator | undefined {
    return this.requestHeaderGenerator;
  }

  public getConfig(): CommunicatorConfiguration {
    return this.config;
  }

  /**
   * Set client-specific fetch options that will override global configuration options.
   * @param fetchOptions - Custom fetch options for this API client instance
   */
  public setFetchOptions(fetchOptions: FetchOptions): void {
    this.clientFetchOptions = fetchOptions;
  }

  /**
   * Get the effective fetch options by merging global and client-specific options.
   * Client-specific options take precedence over global options.
   */
  private getEffectiveFetchOptions(): FetchOptions | undefined {
    const globalOptions = this.config.getFetchOptions();

    if (!globalOptions && !this.clientFetchOptions) {
      return undefined;
    }

    // Merge options with client-specific taking precedence
    return {
      ...globalOptions,
      ...this.clientFetchOptions,
      // Special handling for headers - merge them instead of replacing
      headers: {
        ...globalOptions?.headers,
        ...this.clientFetchOptions?.headers,
      },
    };
  }

  protected async makeApiCall<T>(
    url: string,
    requestInit: RequestInit,
    parseBody: (body: string) => T = BaseApiClient.parseJson,
  ): Promise<T> {
    // First apply SDK headers and authentication
    requestInit = this.requestHeaderGenerator.generateAdditionalRequestHeaders(url, requestInit);

    // Then merge with custom fetch options (user options take precedence)
    const effectiveFetchOptions = this.getEffectiveFetchOptions();
    if (effectiveFetchOptions) {
      requestInit = {
        ...effectiveFetchOptions,
        ...requestInit,
        // Special handling for headers - merge them instead of replacing
        headers: {
          ...effectiveFetchOptions.headers,
          ...requestInit.headers,
        },
      };
    }

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
