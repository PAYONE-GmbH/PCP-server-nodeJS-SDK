import type { AmountOfMoney } from './AmountOfMoney.js';
import type { CancellationReason } from './CancellationReason.js';
import type { PaymentInstructions } from './PaymentInstructions.js';
import type { PaymentType } from './PaymentType.js';
import type { StatusValue } from './StatusValue.js';

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
   * @description Reason of the Refund (e.g. communicated by or to the costumer).
   * @maxLength 255
   * @example Customer complained
   */
  returnReason?: string;

  /**
   * @description Payment instructions associated with this payment event.
   */
  paymentInstructions?: PaymentInstructions;

  /**
   * Format: UUID
   * @readonly
   */
  paymentEventId?: string;

  /**
   * Format: date-time
   * @description The date and time when the payment event was created.
   *
   *     Format will be in one of the following formats:
   *     * YYYY-MM-DD'T'HH:mm:ss'Z'
   *     * YYYY-MM-DD'T'HH:mm:ss+XX:XX
   *     * YYYY-MM-DD'T'HH:mm:ss-XX:XX
   * @example 2022-01-01T00:00:00Z
   * @readonly
   */
  creationDateTime?: string;

  /**
   * @description Unique reference from the merchant that was used when the event was created (e.g. from the capture request).
   * @maxLength 20
   * @example your-order-6372
   */
  merchantReference?: string;
}
