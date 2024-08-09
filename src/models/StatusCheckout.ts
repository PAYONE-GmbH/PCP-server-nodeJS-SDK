/**
 * Current high-level status of the Checkout
 */
export enum StatusCheckout {
  Open = 'OPEN',
  PendingCompletion = 'PENDING_COMPLETION',
  Completed = 'COMPLETED',
  Billed = 'BILLED',
  Chargebacked = 'CHARGEBACKED',
  Deleted = 'DELETED',
}
