/** @description Object containing browser specific redirection related data. */
export interface RedirectionData {
  /**
   * @description The URL that the customer is redirected to after the payment flow has finished. You can add any number of
   *     key value pairs in the query string that, for instance help you to identify the customer when they return to
   *     your site. Please note that we will also append some additional key value pairs that will also help you with
   *     this identification process.
   *     Note: The provided URL should be absolute and contain the protocol to use, e.g. http:// or https://. For use
   *     on mobile devices a custom protocol can be used in the form of protocol://. This protocol must be registered
   *     on the device first.
   *     URLs without a protocol will be rejected.
   * @example https://secure.ogone.com/ncol/test/displayparams.asp
   */
  returnUrl: string;
}
