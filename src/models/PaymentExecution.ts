import type { CardPaymentMethodSpecificInput } from './CardPaymentMethodSpecificInput.js';
import type { FinancingPaymentMethodSpecificInput } from './FinancingPaymentMethodSpecificInput.js';
import type { MobilePaymentMethodSpecificInput } from './MobilePaymentMethodSpecificInput.js';
import type { PaymentChannel } from './PaymentChannel.js';
import type { PaymentEvent } from './PaymentEvent.js';
import type { RedirectPaymentMethodSpecificInput } from './RedirectPaymentMethodSpecificInput.js';
import type { References } from './References.js';
import type { SepaDirectDebitPaymentMethodSpecificInput } from './SepaDirectDebitPaymentMethodSpecificInput.js';

/** @description Object contains information of the payment with a specific payment method. */
export interface PaymentExecution {
  /**
   * Format: UUID
   * @description Unique ID of paymentExecution.
   * @example 4f0c512e-f12c-11ec-8ea0-0242ac120002
   */
  paymentExecutionId?: string;
  /**
   * @description Unique payment transaction identifier of the payment gateway.
   * @example 3066019730_1
   */
  paymentId?: string;
  cardPaymentMethodSpecificInput?: CardPaymentMethodSpecificInput;
  mobilePaymentMethodSpecificInput?: MobilePaymentMethodSpecificInput;
  redirectPaymentMethodSpecificInput?: RedirectPaymentMethodSpecificInput;
  sepaDirectDebitPaymentMethodSpecificInput?: SepaDirectDebitPaymentMethodSpecificInput;
  financingPaymentMethodSpecificInput?: FinancingPaymentMethodSpecificInput;
  paymentChannel?: PaymentChannel;
  references?: References;
  events?: PaymentEvent[];
}
