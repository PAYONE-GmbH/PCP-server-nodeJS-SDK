import type { CaptureOutput } from './CaptureOutput.js';
import type { PaymentStatusOutput } from './PaymentStatusOutput.js';
import type { StatusValue } from './StatusValue.js';

export interface CapturePaymentResponse {
  captureOutput?: CaptureOutput;
  status?: StatusValue;
  statusOutput?: PaymentStatusOutput;
  /**
   * @description Unique payment transaction identifier of the payment gateway.
   * @example 3066019730_1
   */
  id?: string;
}
