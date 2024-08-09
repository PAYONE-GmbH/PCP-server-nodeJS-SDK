import type { CancellationReason } from './CancellationReason.js';

export interface CancelPaymentRequest {
  cancellationReason?: CancellationReason;
}
