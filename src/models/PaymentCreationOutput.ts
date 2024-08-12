/** @description Object containing the details of the created payment. */
export interface PaymentCreationOutput {
  /**
   * @description The external reference is an identifier for this transaction and can be used for reconciliation purposes.
   * @example C1232O2342
   */
  externalReference?: string;
}
