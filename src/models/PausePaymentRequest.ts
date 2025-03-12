import type { RefreshType } from './RefreshType.js';

/**
 * @description Request to refresh the payment status of a specific payment.
 */
export interface PausePaymentRequest {
  /**
   * @description Type of refresh action to be performed.
   */
  refreshType: RefreshType;
}
