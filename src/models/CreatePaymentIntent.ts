import type { AmountOfMoney } from './AmountOfMoney.js';
import type { PaymentReferences } from './PaymentReferences.js';
import type { ShoppingCartData } from './ShoppingCartData.js';

/** @description Object containing payment intent details. */
export interface CreatePaymentIntent {
  amountOfMoney?: AmountOfMoney;
  references?: PaymentReferences;
  shoppingCart?: ShoppingCartData;
}
