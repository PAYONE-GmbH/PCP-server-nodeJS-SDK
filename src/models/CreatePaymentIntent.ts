import type { AmountOfMoney } from './AmountOfMoney.js';
import type { PaymentReferencesForPaymentIntent } from './PaymentReferencesForPaymentIntent.js';
import type { ShoppingCartData } from './ShoppingCartData.js';

/** @description Object containing payment intent details. */
export interface CreatePaymentIntent {
  amountOfMoney?: AmountOfMoney;
  references: PaymentReferencesForPaymentIntent;
  shoppingCart?: ShoppingCartData;
}
