import type { AmountOfMoney } from './AmountOfMoney.js';
import type { References } from './References.js';
import type { ShoppingCartInput } from './ShoppingCartInput.js';

/**
 * @description The amount of the paymentSpecificInput might differ from the Checkout amount in case of partial payments but cannot be higher.
 *     Additionally, the total amount of the provided shopping cart cannot exceed the Checkout amount.
 *     If a different currency is provided than in the Checkout, the payment execution will be declined.
 *     Provided details of the customer and shipping from the Checkout will be automatically loaded and used in the Payment Execution request.
 *     The ShoppingCart might differ from the one provided in the Checkout (e.g., for partial payments) and might be required by the payment provider (e.g., BNPL).
 *     If the ShoppingCart elements differ from the data provided in the Checkout, the existing data will not be overwritten.
 */
export interface PaymentExecutionSpecificInput {
  amountOfMoney?: AmountOfMoney;
  shoppingCart?: ShoppingCartInput;
  paymentReferences: References;
}
