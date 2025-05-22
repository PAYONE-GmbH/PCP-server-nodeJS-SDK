/** @description Object containing specific input required for PayPal payments (Payment product ID 840) */
export interface RedirectPaymentProduct840SpecificInput {
  /**
   *  @description Indicates whether to use PayPal Express Checkout Shortcut.
   *      * true = When shortcut is enabled, the consumer can select a shipping address during PayPal checkout.
   *      * false = When shortcut is disabled, the consumer cannot change the shipping address.
   *     Default value is false.
   *     Please note that this field is ignored when order.additionalInput.typeInformation.purchaseType is set to
   *     "digital"
   */
  addressSelectionAtPayPal?: boolean;
  /**
   * @description A unique ID determined by the merchant, to link a Paypal transaction to a FraudNet PayPal risk session.
   * Only applicable to customer-initiated transactions, when the FraudNet SDK is used, and to be passed in the API request the same tracking ID value
   * (FraudNet Session Identifier).
   */
  fraudNetId?: string;
}
