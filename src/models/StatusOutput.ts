import type { PaymentStatus } from './PaymentStatus.js';

/** @description Contains information about whether the payment of the Checkout has already been completed and how much of the total sum has been collected already. */
export interface StatusOutput {
  paymentStatus?: PaymentStatus;
  /** @description Indicates whether the Checkout can still be modified. False if any payment is already in progress, true otherwise. */
  isModifiable?: boolean;
  /**
   * Format: int64
   * @description Amount in cents always having 2 decimals. The amount yet to be paid.
   */
  openAmount?: number;
  /**
   * Format: int64
   * @description Amount in cents always having 2 decimals. The amount that has already been collected.
   */
  collectedAmount?: number;
  /**
   * Format: int64
   * @description Amount in cents always having 2 decimals. The amount that has already been cancelled.
   */
  cancelledAmount?: number;
  /**
   * Format: int64
   * @description Amount in cents always having 2 decimals. Amount that has been collected but was refunded to the customer.
   */
  refundedAmount?: number;
  /**
   * Format: int64
   * @description Amount in cents always having 2 decimals. Amount that has been collected but was charged back by the
   *     customer.
   */
  chargebackAmount?: number;
}
