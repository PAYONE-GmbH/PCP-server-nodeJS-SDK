/** @description Information for card payments realized at a POS. */
export interface CardPaymentDetails {
  /**
   * @description Reference to the card of the transaction.
   * @example 672559XXXXXX1108
   */
  maskedCardNumber?: string;
  /**
   * @description ID of the token. This property is populated when the payment was done with a token.
   * @example 0ca037cc-9079-4df7-8f6f-f2a3443ee521
   */
  paymentProcessingToken?: string;
  /**
   * @description Token to identify the card in the reporting.
   * @example 12a037cc-833d-8b45-8f6f-11c34171f4e1
   */
  reportingToken?: string;
  /**
   * @description Identifier for a successful authorization, reversal or refund.
   *     Usually provided by the issuer system. Only provided for card payments.
   *
   * @example 260042
   */
  cardAuthorizationId?: string;
}
