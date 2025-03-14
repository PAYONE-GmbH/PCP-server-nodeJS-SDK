import type { PayoutResponse } from './PayoutResponse.js';

/**
 * @description Response for a Payment Information refund request.
 */
export interface PaymentInformationRefundResponse {
  /**
   * @description Details of the refund payment.
   */
  payment?: PayoutResponse;

  /**
   * @description Reference to the payment execution.
   * @example "4f0c512e-f12c-11ec-8ea0-0242ac120002"
   */
  paymentExecutionId?: string;
}
