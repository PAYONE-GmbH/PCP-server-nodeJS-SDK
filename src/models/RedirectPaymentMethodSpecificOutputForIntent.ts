import type { PaymentProduct840SpecificOutputForIntent } from './PaymentProduct840SpecificOutputForIntent.js';
import type { PaymentProductId } from './PaymentProductId.js';

/** @description Redirect payment product details for a payment intent. */
export interface RedirectPaymentMethodSpecificOutputForIntent {
  paymentProductId?: PaymentProductId;
  paymentProduct840SpecificOutput?: PaymentProduct840SpecificOutputForIntent;
}
