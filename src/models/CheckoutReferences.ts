/** @description Object containing all details that are linked to the Checkout. */
export interface CheckoutReferences {
  /**
   * @description Unique reference of the Checkout that is also returned for reporting and reconciliation purposes.
   * @example customer-order-1234
   */
  merchantReference?: string;
  /**
   * @description Optional parameter to define the shop or touchpoint where a sale has been realized (e.g. different stores).
   * @example Shop-12345
   */
  merchantShopReference?: string;
}
