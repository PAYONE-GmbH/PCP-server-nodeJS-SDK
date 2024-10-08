/**
 * Highlevel status of the payment, payout or Refund.
 */
export enum StatusCategoryValue {
  Created = 'CREATED',
  Unsuccessful = 'UNSUCCESSFUL',
  PendingPayment = 'PENDING_PAYMENT',
  PendingMerchant = 'PENDING_MERCHANT',
  PendingConnectOr3RdParty = 'PENDING_CONNECT_OR_3RD_PARTY',
  Completed = 'COMPLETED',
  Reversed = 'REVERSED',
  Refunded = 'REFUNDED',
}
