/**
 * Current high-level status of the Checkout
 */
export enum StatusCheckout {
  OPEN = 'OPEN',
  PENDINGCOMPLETION = 'PENDING_COMPLETION',
  COMPLETED = 'COMPLETED',
  BILLED = 'BILLED',
  CHARGEBACKED = 'CHARGEBACKED',
  DELETED = 'DELETED',
}
