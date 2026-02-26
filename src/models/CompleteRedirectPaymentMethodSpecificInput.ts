import type { CompletePaymentProduct840SpecificInput } from './CompletePaymentProduct840SpecificInput.js';
import type { PaymentProductId } from './PaymentProductId.js';

/** @description Object containing the redirect payment product details. */
export interface CompleteRedirectPaymentMethodSpecificInput {
  paymentProductId?: PaymentProductId;
  paymentProduct840SpecificInput?: CompletePaymentProduct840SpecificInput;
}
