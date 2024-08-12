import type { PaymentOutput } from './PaymentOutput.js';
import type { PaymentStatusOutput } from './PaymentStatusOutput.js';
import type { StatusValue } from './StatusValue.js';

/** @description Object that holds the payment related properties. */
export interface PaymentResponse {
  paymentOutput?: PaymentOutput;
  status?: StatusValue;
  statusOutput?: PaymentStatusOutput;
  /**
   * @description Unique payment transaction identifier of the payment gateway.
   * @example PP1AA7KKLSFB9MBG
   */
  id?: string;
}
