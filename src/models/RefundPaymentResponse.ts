import type { PaymentStatusOutput } from './PaymentStatusOutput.js';
import type { RefundOutput } from './RefundOutput.js';
import type { StatusValue } from './StatusValue.js';

/**
 * @description This object has the numeric representation of the current Refund status, timestamp of last status change and
 *     performable action on the current Refund resource. In case of a rejected Refund, detailed error information is
 *     listed.
 */
export interface RefundPaymentResponse {
  refundOutput?: RefundOutput;
  status?: StatusValue;
  statusOutput?: PaymentStatusOutput;
  /**
   * @description Unique payment transaction identifier of the payment gateway.
   * @example 3066019730_1
   */
  id?: string;
}
