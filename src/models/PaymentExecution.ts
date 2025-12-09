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
 * @description Object contains information of the payment with a specific payment method.
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
   * @description Reference to the previous payment, if applicable.
   * @example cee5276d-6b1e-4a4f-a46f-27b7550d484e
   */
  previousPayment?: string;

  /**
   * @description The date and time when the payment was created.
   *
   *     Format will be in one of the following formats:
   *     * YYYY-MM-DD'T'HH:mm:ss'Z'
   *     * YYYY-MM-DD'T'HH:mm:ss+XX:XX
   *     * YYYY-MM-DD'T'HH:mm:ss-XX:XX
   * @example 2022-01-01T00:00:00Z
   */
  creationDateTime?: string;

  /**
   * @description The date and time when the payment was last updated.
   *
   *     Format will be in one of the following formats:
   *     * YYYY-MM-DD'T'HH:mm:ss'Z'
   *     * YYYY-MM-DD'T'HH:mm:ss+XX:XX
   *     * YYYY-MM-DD'T'HH:mm:ss-XX:XX
   * @example 2022-01-01T00:00:00Z
   */
  lastUpdated?: string;

  /**
   * @description Payment events associated with this payment execution.
   */
  events?: PaymentEvent[];
}
