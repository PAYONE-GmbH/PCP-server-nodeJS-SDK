import type { RequestInit } from 'node-fetch';

/**
 * Custom fetch options that allow users to configure HTTP client behavior.
 *
 * This extends the standard RequestInit interface to provide flexibility for:
 * - Configure custom timeouts using AbortController
 * - Set up proxy configurations using agents
 * - Implement custom SSL/TLS settings
 * - Add custom headers and authentication
 * - Configure retry behavior and other HTTP settings
 *
 * These options will be merged with the SDK's default request options,
 * with user-provided options taking precedence.
 *
 * @example
 * ```typescript
 * import { HttpsProxyAgent } from 'https-proxy-agent';
 *
 * // Configure timeout and proxy
 * const fetchOptions: FetchOptions = {
 *   // Custom timeout using AbortController
 *   signal: AbortSignal.timeout(30000), // 30 second timeout
 *
 *   // Proxy configuration
 *   agent: new HttpsProxyAgent('http://proxy.example.com:8080'),
 *
 *   // Custom headers
 *   headers: {
 *     'User-Agent': 'MyApp/1.0',
 *     'X-Custom-Header': 'custom-value'
 *   }
 * };
 *
 * const config = new CommunicatorConfiguration(
 *   apiKey,
 *   apiSecret,
 *   'https://api.preprod.commerce.payone.com',
 *   fetchOptions
 * );
 * ```
 */

// We explicitly introduce an empty interface to be not too depdendend on node-fetch incase we want to change the HTTP client in the future
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FetchOptions extends RequestInit {
  // Inherits all standard RequestInit properties:
  // - method?: string
  // - headers?: HeadersInit
  // - body?: BodyInit
  // - signal?: AbortSignal
  // - agent?: Agent (for proxy support)
  // - etc.
}
