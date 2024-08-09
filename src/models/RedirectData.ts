/** @description Object containing all data needed to redirect the customer. */
export interface RedirectData {
  /**
   * @description The URL that the customer should be redirected to. Be sure to redirect using the GET method
   * @example https://example-mandate-signing-url.com\
   */
  redirectURL?: string;
}
