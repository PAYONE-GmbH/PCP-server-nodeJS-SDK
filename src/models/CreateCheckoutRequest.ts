import type { AmountOfMoney } from './AmountOfMoney.js';
import type { CheckoutReferences } from './CheckoutReferences.js';
import type { CreationDateTime } from './CreationDateTime.js';
import type { OrderRequest } from './OrderRequest.js';
import type { Shipping } from './Shipping.js';
import type { ShoppingCartInput } from './ShoppingCartInput.js';

/**
 * @description Request to create a Checkout for a Commerce Case.
 *     The payment for the Checkout can be directly executed if autoExecuteOrder = true.
 *     In this case, the paymentMethodSpecificInput must be provided and only a full order is possible.
 *
 *     If no amountOfMoney is provided, the platform will calculate the respective Checkout amount based on the
 *     cartItem productPrice and quantity.
 *
 *     In case of a payment error, the payment can be retried by providing the respective commerceCaseId and checkoutId
 *     to the the Order or Payment Execution endpoint.
 */
export interface CreateCheckoutRequest {
  amountOfMoney?: AmountOfMoney;
  references?: CheckoutReferences;
  shipping?: Shipping;
  shoppingCart?: ShoppingCartInput;
  orderRequest?: OrderRequest;
  creationDateTime?: CreationDateTime;
  /**
   * @description Set this flag to directly execute a payment when creating a Commerce Case or Checkout.
   *     If the value for autoExecuteOrder is set to true, the paymentMethodSpecificInput for the order is mandatory
   *     and has to be provided. The autoExecuteOrder can only be used for orderType = full.
   *     If no shoppingCart information has been provided, a Payment Execution will be created instead of an Order. As a consequence, only Payment Execution endpoints can be used.
   *
   * @default false
   */
  autoExecuteOrder?: boolean;
}
