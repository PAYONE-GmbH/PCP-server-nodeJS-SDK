import type { AmountOfMoney } from './AmountOfMoney.js';
import type { Customer } from './Customer.js';
import type { References } from './References.js';
import type { Shipping } from './Shipping.js';
import type { ShoppingCartInput } from './ShoppingCartInput.js';

/** @description Order object containing order related data Please note that this object is required to be able to submit the amount. */
export interface Order {
  amountOfMoney?: AmountOfMoney;
  customer?: Customer;
  references?: References;
  shipping?: Shipping;
  shoppingCart?: ShoppingCartInput;
}
