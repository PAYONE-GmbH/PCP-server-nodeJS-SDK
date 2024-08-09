import type { SepaDirectDebitPaymentProduct771SpecificInput } from './SepaDirectDebitPaymentProduct771SpecificInput.js';

/** @description Object containing the specific input details for SEPA direct debit payments */
export interface SepaDirectDebitPaymentMethodSpecificInput {
  paymentProduct771SpecificInput?: SepaDirectDebitPaymentProduct771SpecificInput;
  /**
   * Format: int32
   * @description Payment product identifier - please check product documentation for a full overview of possible values.
   * @example 840
   */
  paymentProductId?: number;
}
