/** @description Object that holds all reference properties that are linked to this transaction. */
export interface PaymentReferences {
  /**
   * @description Unique reference of payment transactions, also returned for reporting and reconciliation purposes.
            For capture requests, providing this value is recommended to support an end-to-end refund flow.
            If provided for captures or refunds, it must be unique per Checkout.
   * @maxLength 20
   * @example your-order-6372
   */
  merchantReference?: string;
}
