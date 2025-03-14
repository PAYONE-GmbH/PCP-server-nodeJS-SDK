import type { PaymentType } from './PaymentType.js';
import type { AmountOfMoney } from './AmountOfMoney.js';
import type { StatusValue } from './StatusValue.js';
import type { CancellationReason } from './CancellationReason.js';
import type { PaymentInstructions } from './PaymentInstructions.js';

/**
 * @description Detailed information regarding an occurred payment event.
 */
export interface PaymentEvent {
  /**
   * @description Type of payment event.
   */
  type?: PaymentType;

  /**
   * @description Amount of money associated with the payment event.
   */
  amountOfMoney?: AmountOfMoney;

  /**
   * @description Current status of the payment.
   */
  paymentStatus?: StatusValue;

  /**
   * @description Reason for payment cancellation.
   */
  cancellationReason?: CancellationReason;

  /**
   * @description Reason for refund (e.g., communicated by or to the customer).
   */
  returnReason?: string;

  /**
   * @description Payment instructions associated with this payment event.
   */
  paymentInstructions?: PaymentInstructions;
}
