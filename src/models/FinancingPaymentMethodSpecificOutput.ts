import type { PaymentProduct3391SpecificOutput } from './PaymentProduct3391SpecificOutput.js';

/** @description Object containing the specific output details for financing payment methods (Buy Now Pay Later) */
export interface FinancingPaymentMethodSpecificOutput {
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
  paymentProduct3391SpecificOutput?: PaymentProduct3391SpecificOutput;
}
