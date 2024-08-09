/**
 * @description The extendedCheckoutStatus provides a more granular status of the Checkout based on the respective amounts. The
 *     extendedCheckoutStatus include the regular Checkout status OPEN, DELETED, PENDING_COMPLETION, COMPLETED, BILLED,
 *     and CHARGEBACKED as well as three additional status:
 *
 *     1. PARTIALLY_BILLED: Checkout amount has been partially collected. Overall the Checkout status is BILLED and one
 *     of the following conditions is true:
 *       (1) the openAmount is greater than zero or
 *       (2) the openAmount is zero, the refundAmount is zero and the checkoutAmount is not equal to collectedAmount plus the cancelledAmount.
 *     2. PARTIALLY_REFUNDED: The entire Checkout amount has been captured and an amount has been partially refunded to
 *     customer. Overall the Checkout status is BILLED, the openAmount is zero and the refundAmount and collectedAmount
 *     are greater than zero.
 *     3. REFUNDED: The entire Checkout amount has been refunded to the customer. Overall the Checkout status is
 *     BILLED, the openAmount and collectedAmount are zero but the refundAmount is greater than zero.
 *
 * @example OPEN
 */
export enum ExtendedCheckoutStatus {
  OPEN = 'OPEN',
  DELETED = 'DELETED',
  PENDING_COMPLETION = 'PENDING_COMPLETION',
  COMPLETED = 'COMPLETED',
  PARTIALLY_BILLED = 'PARTIALLY_BILLED',
  BILLED = 'BILLED',
  CHARGEBACKED = 'CHARGEBACKED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
  REFUNDED = 'REFUNDED',
}
