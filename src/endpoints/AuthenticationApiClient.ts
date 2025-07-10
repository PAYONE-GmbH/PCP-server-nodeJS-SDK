import { BaseApiClient } from './BaseApiClient.js';
import type { AuthenticationToken } from '../models/AuthenticationToken.js';
import { Headers, type RequestInit } from 'node-fetch';

/**
 * Client for authentication token operations.
 */
export class AuthenticationApiClient extends BaseApiClient {
  /**
   * Generate an authentication JWT token for a merchant.
   * @param merchantId The Merchant Id (required)
   * @param requestId Optional X-Request-ID header value (may be null)
   * @returns AuthenticationToken
   */
  public async getAuthenticationTokens(merchantId: string, requestId?: string): Promise<AuthenticationToken> {
    if (!merchantId) {
      throw new Error('Merchant ID is required');
    }

    const url = new URL(`/v1/${merchantId}/authentication-tokens`, this.getConfig().getHost());

    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    if (requestId) {
      headers.append('X-Request-ID', requestId);
    }
    const requestInit: RequestInit = {
      method: 'POST',
      headers,
      // node-fetch expects null for empty body
      body: null,
    };
    return this.makeApiCall<AuthenticationToken>(url.toString(), requestInit);
  }
}
