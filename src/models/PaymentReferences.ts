/** @description Object that holds all reference properties that are linked to this transaction. */
export interface PaymentReferences {
  /**
   * @description Unique reference of the Commerce Case that is also returned for reporting and reconciliation purposes.
   * @maxLength 20
   * @example your-order-6372
   */
  merchantReference?: string;
}
