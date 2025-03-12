import type { CompletePaymentMethodSpecificInput } from './CompletePaymentMethodSpecificInput.js';

/**
 * @description The Complete-Order request is the last step to finalize the initial Order.
 * It requires the completePaymentMethodSpecificInput. The previously provided data
 * from the Commerce Case, Checkout, and Order will automatically be loaded and used
 * for the completion of the Order.
 */
export interface CompleteOrderRequest {
  /**
   * @description Contains the specific input required to complete the payment.
   */
  completePaymentMethodSpecificInput?: CompletePaymentMethodSpecificInput;
}
