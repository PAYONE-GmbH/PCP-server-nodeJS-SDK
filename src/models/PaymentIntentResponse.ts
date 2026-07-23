import type { PaymentIntentResponseData } from './PaymentIntentResponseData.js';
import type { RedirectPaymentMethodSpecificOutputForIntent } from './RedirectPaymentMethodSpecificOutputForIntent.js';

/** @description Object containing details for a payment intent. */
export interface PaymentIntentResponse extends PaymentIntentResponseData {
  redirectPaymentMethodSpecificOutput?: RedirectPaymentMethodSpecificOutputForIntent;
}
