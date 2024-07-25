export class CommunicatorConfiguration {
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly host: string;

  constructor(apiKey: string, apiSecret: string, host: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.host = host;
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
}
