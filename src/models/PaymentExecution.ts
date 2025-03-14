import type { BankPayoutMethodSpecificInput } from './BankPayoutMethodSpecificInput.js';
import type { CardPaymentMethodSpecificInput } from './CardPaymentMethodSpecificInput.js';
import type { FinancingPaymentMethodSpecificInput } from './FinancingPaymentMethodSpecificInput.js';
import type { MobilePaymentMethodSpecificInput } from './MobilePaymentMethodSpecificInput.js';
import type { PaymentChannel } from './PaymentChannel.js';
import type { PaymentEvent } from './PaymentEvent.js';
import type { RedirectPaymentMethodSpecificInput } from './RedirectPaymentMethodSpecificInput.js';
import type { References } from './References.js';
import type { SepaDirectDebitPaymentMethodSpecificInput } from './SepaDirectDebitPaymentMethodSpecificInput.js';

/**
 * @description Object containing information of the payment with a specific payment method.
 */
export interface PaymentExecution {
  /**
   * @description Unique ID of paymentExecution.
   */
  paymentExecutionId?: string;

  /**
   * @description Unique payment transaction identifier of the payment gateway.
   */
  paymentId?: string;

  cardPaymentMethodSpecificInput?: CardPaymentMethodSpecificInput;
  mobilePaymentMethodSpecificInput?: MobilePaymentMethodSpecificInput;
  redirectPaymentMethodSpecificInput?: RedirectPaymentMethodSpecificInput;
  sepaDirectDebitPaymentMethodSpecificInput?: SepaDirectDebitPaymentMethodSpecificInput;
  financingPaymentMethodSpecificInput?: FinancingPaymentMethodSpecificInput;
  bankPayoutMethodSpecificInput?: BankPayoutMethodSpecificInput;

  /**
   * @description Payment channel used for the transaction.
   */
  paymentChannel?: PaymentChannel;

  /**
   * @description Reference details associated with this payment execution.
   */
  references?: References;

  /**
   * @description Previous payment ID, if applicable.
   */
  previousPayment?: string;

  /**
   * @description The date and time when the payment was created.
   */
  creationDateTime?: string;

  /**
   * @description The date and time when the payment was last updated.
   */
  lastUpdated?: string;

  /**
   * @description List of payment events associated with this payment execution.
   */
  events?: PaymentEvent[];
}
