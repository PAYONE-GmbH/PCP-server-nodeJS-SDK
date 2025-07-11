import { AuthenticationApiClient, CommunicatorConfiguration } from 'pcp-server-nodejs-sdk';

export class AuthenticationApiExample {
  private readonly client: AuthenticationApiClient;
  private readonly merchantId: string;

  constructor(config: CommunicatorConfiguration, merchantId: string) {
    this.client = new AuthenticationApiClient(config);
    this.merchantId = merchantId;
  }

  async runGetToken() {
    try {
      const token = await this.client.getAuthenticationTokens(this.merchantId);
      console.log('AuthenticationToken:', token.token);
      console.log('Token ID:', token.id);
      console.log('Created:', token.creationDate);
      console.log('Expires:', token.expirationDate);
    } catch (err) {
      console.error('Failed to get authentication token:', err);
    }
  }
}
