import type { FetchOptions } from './types/FetchOptions.js';

export class CommunicatorConfiguration {
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly host: string;
  private readonly fetchOptions?: FetchOptions;

  constructor(apiKey: string, apiSecret: string, host: string, fetchOptions?: FetchOptions) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.host = host;
    this.fetchOptions = fetchOptions;
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  public getApiSecret(): string {
    return this.apiSecret;
  }

  public getHost(): string {
    return this.host;
  }

  public getFetchOptions(): FetchOptions | undefined {
    return this.fetchOptions;
  }
}
