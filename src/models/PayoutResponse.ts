import type { PayoutOutput } from './PayoutOutput.js';
import type { StatusValue } from './StatusValue.js';
import type { StatusCategoryValue } from './StatusCategoryValue.js';

/**
 * Object that holds the payment-related properties for the refund of a Payment Information.
 */
export interface PayoutResponse {
  /**
   * Payout output details.
   */
  payoutOutput?: PayoutOutput;

  /**
   * Status of the payout.
   */
  status?: StatusValue;

  /**
   * Category of the payout status.
   */
  statusCategory?: StatusCategoryValue;

  /**
   * Unique payment transaction identifier of the payment gateway.
   */
  id?: string;
}
