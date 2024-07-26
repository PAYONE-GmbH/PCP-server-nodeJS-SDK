import fetch, { RequestInit } from 'node-fetch';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration.js';
import { RequestHeaderGenerator } from '../RequestHeaderGenerator.js';
import { ApiErrorResponseException } from '../errors/index.js';

export class BaseApiClient {
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

  protected async makeApiCall<T>(url: string, requestInit: RequestInit): Promise<T> {
    requestInit = this.requestHeaderGenerator.generateAdditionalRequestHeaders(url, requestInit);

    const response = await fetch(url, requestInit);

    const body = await response.json();
    if (response.ok) {
      return body as Promise<T>;
    }
    // TODO check if this is a valid error response
    throw new ApiErrorResponseException(response.status, JSON.stringify(body));
  }
}
