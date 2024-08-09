/**
 * Indicates which party initiated the unscheduled recurring transaction. Allowed values:   * merchantInitiated - Merchant Initiated Transaction.   * cardholderInitiated - Cardholder Initiated Transaction. Note:   * When a customer has chosen to use a token on a hosted Checkout this property is set to \"cardholderInitiated\".
 */
export enum UnscheduledCardOnFileRequestor {
  MerchantInitiated = 'merchantInitiated',
  CardholderInitiated = 'cardholderInitiated',
}
