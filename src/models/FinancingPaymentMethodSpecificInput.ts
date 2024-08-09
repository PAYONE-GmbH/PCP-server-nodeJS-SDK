import type { PaymentProduct3392SpecificInput } from './PaymentProduct3392SpecificInput.js';

/** @description Object containing the specific input details for financing payment methods (Buy Now Pay Later) */
export interface FinancingPaymentMethodSpecificInput {
  /**
   * Format: int32
   * @description Payment product identifier - please check product documentation for a full overview of possible values.
   *     Currently supported payment methods
   *     * 3390 - PAYONE Secured Invoice
   *     * 3391 - PAYONE Secured Installment
   *     * 3392 - PAYONE Secured Direct Debit
   * @example 3390
   */
  paymentProductId?: number;
  /**
   * @description * true = the payment requires approval before the funds will be captured using the Approve payment or
   *     Capture payment API
   *     * false = the payment does not require approval, and the funds will be captured automatically
   *
   *     If the parameter is not provided in the request, the default value will be true
   */
  requiresApproval?: boolean;
  paymentProduct3392SpecificInput?: PaymentProduct3392SpecificInput;
}
