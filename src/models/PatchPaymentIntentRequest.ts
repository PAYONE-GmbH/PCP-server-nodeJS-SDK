import type { AmountOfMoney } from './AmountOfMoney.js';
import type { ShoppingCartData } from './ShoppingCartData.js';

/** @description Object containing details for updating a payment intent. */
export interface PatchPaymentIntentRequest {
  amountOfMoney?: AmountOfMoney;
  shoppingCart?: ShoppingCartData;
}
