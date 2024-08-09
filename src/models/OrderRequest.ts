import type { OrderItem } from './OrderItem.js';
import type { OrderType } from './OrderType.js';
import type { PaymentMethodSpecificInput } from './PaymentMethodSpecificInput.js';
import type { References } from './References.js';

/**
 * @description Request to execute an Order for the corresponding Checkout for a specific payment method.
 *     The provided data from the Commerce Case and the Checkout regarding customer, shipping, and ShoppingCart will be
 *     automatically loaded and used for the Payment Execution.
 *     In case the paymentMethodSpecificInput has already been provided when creating the Commerce Case or Checkout,
 *     this input will automatically be used.
 *     An Order can be created for a full or the partial ShoppingCart of the Checkout. For a partial Order a list of
 *     items must be provided. The platform will automatically calculate the respective amount to trigger the payment
 *     execution.
 */
export interface OrderRequest {
  orderType?: OrderType;
  orderReferences?: References;
  items?: OrderItem[];
  paymentMethodSpecificInput?: PaymentMethodSpecificInput;
}
