/** @description Object containing information about the device of the end customer. */
export interface CustomerDevice {
  /**
   * @description The accept-header of the customer client from the HTTP Headers.
   *     This field can be mandatory depending on the selected payment method and routing option.
   * @maxLength 2048
   * @example text/html,application/xhtml+xml,application/xml;q=0.9,*\/*;q=0.8
   */
  acceptHeader?: string;
  /**
   * @description The IP address of the customer client from the HTTP Headers.
   * @maxLength 45
   */
  ipAddress?: string;
  /**
   * @description Tokenized representation of the end customers device. For example used for PAYONE Buy Now, Pay Later (BNPL).
   * @maxLength 255
   */
  deviceToken?: string;
  /**
   * @description User-Agent of the client device/browser from the HTTP Headers.
   *     This field can be mandatory depending on the selected payment method and routing option
   * @maxLength 2048
   * @example Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36
   */
  userAgent?: string;
}
