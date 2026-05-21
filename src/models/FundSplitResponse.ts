import type { FundSplit } from './FundSplit.js';

/**
 * @description Response object returned after successfully creating a fund split instruction. Contains the unique
 *     identifier of the created fund split and the processing status.
 */
export interface FundSplitResponse {
  /**
   * Format: UUID
   * @description Unique identifier assigned to the created fund split instruction. This ID can be used for tracking
   *     and referencing the fund split in subsequent operations or inquiries.
   * @example a1b2c3d4-e5f6-7890-abcd-ef1234567890
   */
  fundSplitId?: string;

  /**
   * Format: UUID
   * @description Unique identifier of the Payment Execution that this fund split is associated with.
   * @example f47ac10b-58cc-4372-a567-0e02b2c3d479
   */
  paymentExecutionId?: string;

  /**
   * Format: UUID
   * @description Unique identifier of the chargeback event that this fund split instruction was created for.
   * @example c56a4180-65aa-42ec-a945-5fd21dec0538
   */
  eventId?: string;

  fundSplit?: FundSplit;
}
