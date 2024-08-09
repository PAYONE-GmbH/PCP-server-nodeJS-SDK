import type { CompleteFinancingPaymentMethodSpecificInput } from './CompleteFinancingPaymentMethodSpecificInput.js';
import type { CustomerDevice } from './CustomerDevice.js';
import type { Order } from './Order.js';

/**
 * @description The Complete request is the last step to finalize the initially created Payment.
 *   It requires the completeFinancingPaymentMethodSpecificInput.
 *   The data for the order object should not differ from the previously provided information in Commerce Case, Checkout and Payment, but will not be validated nor automatically loaded from the Commerce Platform.
 */
export interface CompletePaymentRequest {
  financingPaymentMethodSpecificInput?: CompleteFinancingPaymentMethodSpecificInput;
  order?: Order;
  device?: CustomerDevice;
}
