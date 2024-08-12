import type { AmountOfMoney } from './AmountOfMoney.js';
import type { CancellationReason } from './CancellationReason.js';
import type { PaymentType } from './PaymentType.js';
import type { StatusValue } from './StatusValue.js';

/** @description Detailed information regarding an occurred payment event. */
export interface PaymentEvent {
  type?: PaymentType;
  amountOfMoney?: AmountOfMoney;
  paymentStatus?: StatusValue;
  cancellationReason?: CancellationReason;
  /**
   * @description Reason of the Refund (e.g. communicated by or to the costumer).
   * @example Customer complained
   */
  returnReason?: string;
}
