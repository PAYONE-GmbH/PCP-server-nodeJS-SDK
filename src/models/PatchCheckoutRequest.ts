import type { AmountOfMoney } from './AmountOfMoney.js';
import type { CheckoutReferences } from './CheckoutReferences.js';
import type { PaymentMethodSpecificInput } from './PaymentMethodSpecificInput.js';
import type { References } from './References.js';
import type { Shipping } from './Shipping.js';
import type { ShoppingCartPatch } from './ShoppingCartPatch.js';

/**
 * @description An existing shopping cart of a Checkout will not be overwritten with the Patch request.
 *     New items can be added to the shoppingCart by providing them in the request.
 *     To change existing items (delete, modify or add), the respective itemId must be provided. An item can be completely removed if quantity = 0 is provided.
 *
 *     The price of an item can be changed as long as no payment has happened for this item (i.e. as long as an item has no specific status).
 *     Items with a status can no longer be removed entirely, however the quantity can be increased or decreased (for items without payment) by using the itemId.
 *
 *     If no amountOfMoney for the Checkout is provided, the platform will calculate the respective amount based on the cartItem productPrice and productQuantity.
 */
export interface PatchCheckoutRequest {
  amountOfMoney?: AmountOfMoney;
  references?: CheckoutReferences;
  shipping?: Shipping;
  shoppingCart?: ShoppingCartPatch;
  paymentMethodSpecificInput?: PaymentMethodSpecificInput;
  paymentReferences?: References;
}
