import type { CardPaymentMethodSpecificInput } from './CardPaymentMethodSpecificInput.js';
import type { CustomerDevice } from './CustomerDevice.js';
import type { FinancingPaymentMethodSpecificInput } from './FinancingPaymentMethodSpecificInput.js';
import type { MobilePaymentMethodSpecificInput } from './MobilePaymentMethodSpecificInput.js';
import type { PaymentChannel } from './PaymentChannel.js';
import type { RedirectPaymentMethodSpecificInput } from './RedirectPaymentMethodSpecificInput.js';
import type { SepaDirectDebitPaymentMethodSpecificInput } from './SepaDirectDebitPaymentMethodSpecificInput.js';

/**
 * @description Input for the payment for a respective payment method.
 *     In case the paymentMethodSpecificInput has already been provided when creating the Commerce Case or Checkout, it
 *     will automatically be used for the Payment Execution.
 *     If a new input will be provided, the existing input will be updated.
 */
export interface PaymentMethodSpecificInput {
  cardPaymentMethodSpecificInput?: CardPaymentMethodSpecificInput;
  mobilePaymentMethodSpecificInput?: MobilePaymentMethodSpecificInput;
  redirectPaymentMethodSpecificInput?: RedirectPaymentMethodSpecificInput;
  sepaDirectDebitPaymentMethodSpecificInput?: SepaDirectDebitPaymentMethodSpecificInput;
  financingPaymentMethodSpecificInput?: FinancingPaymentMethodSpecificInput;
  customerDevice?: CustomerDevice;
  paymentChannel?: PaymentChannel;
}
