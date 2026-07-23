import type { PaymentIntentResponseData } from './PaymentIntentResponseData.js';
import type { RedirectPaymentMethodSpecificOutputForCreateIntent } from './RedirectPaymentMethodSpecificOutputForCreateIntent.js';

/** @description Object containing details on the created payment intent. */
export interface PaymentIntentOutput extends PaymentIntentResponseData {
  redirectPaymentMethodSpecificOutput?: RedirectPaymentMethodSpecificOutputForCreateIntent;
}
