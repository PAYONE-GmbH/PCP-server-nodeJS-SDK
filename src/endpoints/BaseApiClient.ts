import fetch, { RequestInit, Response } from 'node-fetch';
import { CommunicatorConfiguration } from '../CommunicatorConfiguration';
import { RequestHeaderGenerator } from '../RequestHeaderGenerator';
import { ApiResponseRetrievalException } from '../errors';
import { ErrorResponse } from '../models';

export class BaseApiClient {
  private readonly JSON_PARSE_ERROR = 'Expected valid JSON response, but failed to parse';
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
    await this.handleError(response);
    return response.json() as Promise<T>;
  }

  private async handleError(response: Response): Promise<void> {
    if (response.ok) {
      return;
    }

    const responseBody = (await response.json()) as Promise<ErrorResponse>;
    if (!responseBody) {
      throw new ApiResponseRetrievalException(response.status, responseBody);
    }
  }
}
