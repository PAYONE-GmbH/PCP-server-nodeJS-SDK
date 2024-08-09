import type { PaymentProduct3391SpecificInput } from './PaymentProduct3391SpecificInput.js';

/**
 * @description To complete the Payment the completeFinancingMethodSpecificInput has to be provided.
 *    At the moment it is only available for PAYONE Secured Installment (paymentProductId 3391).
 */
export interface CompleteFinancingPaymentMethodSpecificInput {
  /**
   * Format: int32
   * @description Payment product identifier. Currently supported payment methods:
   *     * 3391 - PAYONE Secured Installment
   * @example 3391
   */
  paymentProductId?: number;
  /**
   * @description * true = the payment requires approval before the funds will be captured using the Approve payment or Capture payment API
   *                false = the payment does not require approval, and the funds will be captured automatically
   *
   *  If the parameter is not provided in the request, the default value will be true
   */
  requiresApproval?: boolean;
  paymentProduct3391SpecificInput?: PaymentProduct3391SpecificInput;
}
