import type { PaymentInstructions } from './PaymentInstructions.js';
import type { PaymentProduct3391SpecificOutput } from './PaymentProduct3391SpecificOutput.js';

/**
 * @description Object containing the specific output details for financing payment methods (Buy Now Pay Later).
 */
export interface FinancingPaymentMethodSpecificOutput {
  /**
   * @description Payment product identifier - please check product documentation for a full overview of possible values.
   * Currently supported payment methods:
   * - `3390` - PAYONE Secured Invoice
   * - `3391` - PAYONE Secured Installment
   * - `3392` - PAYONE Secured Direct Debit
   * @minimum 0
   * @maximum 99999
   */
  paymentProductId?: number;

  /**
   * @description Specific output details for payment product 3391 (PAYONE Secured Installment).
   */
  paymentProduct3391SpecificOutput?: PaymentProduct3391SpecificOutput;

  /**
   * @description Payment instructions associated with the financing payment method.
   */
  paymentInstructions?: PaymentInstructions;
}
