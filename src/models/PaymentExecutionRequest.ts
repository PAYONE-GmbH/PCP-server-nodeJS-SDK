import type { PaymentExecutionSpecificInput } from './PaymentExecutionSpecificInput.js';
import type { PaymentMethodSpecificInput } from './PaymentMethodSpecificInput.js';

/**
 * @description Request to trigger a payment for a respective Checkout providing the input for a specific payment method.
 *     The data from the Commerce case and the Checkout will not be loaded automatically and there is no validation
 *     between the data input in place.
 *     Depending on the payment method, information of the customer and / or the shopping cart might be required.
 *     For more details regarding payment method specific input please check the documentation.
 */
export interface PaymentExecutionRequest {
  paymentMethodSpecificInput?: PaymentMethodSpecificInput;
  paymentExecutionSpecificInput?: PaymentExecutionSpecificInput;
}
