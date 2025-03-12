import type { StatusValue } from './StatusValue.js';

/**
 * @description Response for pausing a payment.
 */
export interface PausePaymentResponse {
  /**
   * @description Status of the paused payment.
   */
  status?: StatusValue;
}
