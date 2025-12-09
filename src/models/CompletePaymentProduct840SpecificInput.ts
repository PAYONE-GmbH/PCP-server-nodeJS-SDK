/** @description Object containing the specific input details for PayPal payments completed by the merchant. */
export interface CompletePaymentProduct840SpecificInput {
  /**
   * @description Indicates whether the PayPal JavaScript SDK flow is used.
   * * true = The PayPal JavaScript SDK flow is used.
   * * false = The PayPal JavaScript SDK flow is not used.
   * Default value is false.
   * @default false
   * @example true
   */
  javaScriptSdkFlow?: boolean;
  /**
   * @description Confirmation of the order status in case of PayPal SDK integration.
   * @example CONFIRM_ORDER_STATUS
   */
  action: 'CONFIRM_ORDER_STATUS';
}
