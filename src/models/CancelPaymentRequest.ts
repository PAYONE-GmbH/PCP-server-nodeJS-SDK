import type { CancellationReason } from './CancellationReason.js';

export interface CancelPaymentRequest {
  cancellationReason?: CancellationReason;
  /**
   * @description Here you can specify the amount that you want to cancel (specified in cents, where single digit currencies
   *         are presumed to have 2 digits). The amount can be lower than the amount that was authorized, but not higher.
   *         If left empty, the remaining open amount will be cancelled.
   * @minimum 1
   * @maximum 999999999999
   */
  amount?: number;
}
