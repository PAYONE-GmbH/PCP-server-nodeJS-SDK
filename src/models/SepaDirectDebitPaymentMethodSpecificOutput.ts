import type { PaymentProduct771SpecificOutput } from './PaymentProduct771SpecificOutput.js';

/** @description Object containing the SEPA direct debit details. */
export interface SepaDirectDebitPaymentMethodSpecificOutput {
  /**
   * Format: int32
   * @description Payment product identifier - please check product documentation for a full overview of possible values.
   * @example 840
   */
  paymentProductId?: number;
  paymentProduct771SpecificOutput?: PaymentProduct771SpecificOutput;
}
