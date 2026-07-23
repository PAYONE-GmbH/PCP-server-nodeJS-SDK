import type { CreatePaymentIntent } from './CreatePaymentIntent.js';
import type { PaymentMethodSpecificInputForIntent } from './PaymentMethodSpecificInputForIntent.js';

/** @description Object containing details for creating a payment intent. */
export interface CreatePaymentIntentRequest extends CreatePaymentIntent {
  paymentMethodSpecificInput?: PaymentMethodSpecificInputForIntent;
}
