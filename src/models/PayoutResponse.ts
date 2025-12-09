import type { PayoutOutput } from './PayoutOutput.js';
import type { StatusCategoryValue } from './StatusCategoryValue.js';
import type { StatusValue } from './StatusValue.js';

/**
 * @description Object that holds the payment related properties for the refund of a Payment Information.
 */
export interface PayoutResponse {
  /**
   * @description Payout output details.
   */
  payoutOutput?: PayoutOutput;

  /**
   * @description Status of the payout.
   */
  status?: StatusValue;

  /**
   * @description Category of the payout status.
   */
  statusCategory?: StatusCategoryValue;

  /**
   * @description Unique payment transaction identifier of the payment gateway.
   * @example PP1AA7KKLSFB9MBG
   */
  id?: string;
}
