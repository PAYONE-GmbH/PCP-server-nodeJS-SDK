import type { PaymentProduct771SpecificOutput } from './PaymentProduct771SpecificOutput.js';
import type { PaymentProductId } from './PaymentProductId.js';

/** @description Object containing the SEPA direct debit details. */
export interface SepaDirectDebitPaymentMethodSpecificOutput {
  paymentProductId?: PaymentProductId;
  paymentProduct771SpecificOutput?: PaymentProduct771SpecificOutput;
}
