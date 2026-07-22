import type { PaymentIntentOutput } from './PaymentIntentOutput.js';
import type { ShoppingCartData } from './ShoppingCartData.js';

/** @description Object containing details on the created payment intent. */
export interface CreatePaymentIntentResponse {
  shoppingCart?: ShoppingCartData;
  paymentIntentOutput?: PaymentIntentOutput;
}
