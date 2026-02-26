import type { PaymentProductId } from './PaymentProductId.js';
import type { SepaDirectDebitPaymentProduct771SpecificInput } from './SepaDirectDebitPaymentProduct771SpecificInput.js';

/** @description Object containing the specific input details for SEPA direct debit payments */
export interface SepaDirectDebitPaymentMethodSpecificInput {
  paymentProduct771SpecificInput?: SepaDirectDebitPaymentProduct771SpecificInput;
  paymentProductId?: PaymentProductId;
}
