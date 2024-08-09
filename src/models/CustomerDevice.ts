/** @description Object containing information about the device of the end customer. */
export interface CustomerDevice {
  /** @description The IP address of the customer client from the HTTP Headers. */
  ipAddress?: string;
  /** @description Tokenized representation of the end customers device. For example used for PAYONE Buy Now, Pay Later (BNPL). */
  deviceToken?: string;
}
