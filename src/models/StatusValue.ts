/**
 * Current high-level status of the payment in a human-readable form.
 */
export enum StatusValue {
  Created = 'CREATED',
  Cancelled = 'CANCELLED',
  Rejected = 'REJECTED',
  RejectedCapture = 'REJECTED_CAPTURE',
  Redirected = 'REDIRECTED',
  PendingPayment = 'PENDING_PAYMENT',
  PendingCompletion = 'PENDING_COMPLETION',
  PendingCapture = 'PENDING_CAPTURE',
  AuthorizationRequested = 'AUTHORIZATION_REQUESTED',
  CaptureRequested = 'CAPTURE_REQUESTED',
  Captured = 'CAPTURED',
  Reversed = 'REVERSED',
  RefundRequested = 'REFUND_REQUESTED',
  Refunded = 'REFUNDED',
  RejectedRefund = 'REJECTED_REFUND',
  CancellationRequested = 'CANCELLATION_REQUESTED',
  Paused = 'PAUSED',
  Chargebacked = 'CHARGEBACKED',
  ChargebackReversed = 'CHARGEBACK_REVERSED',
  AccountCredited = 'ACCOUNT_CREDITED',
  AccountDebited = 'ACCOUNT_DEBITED',
  PayoutRequested = 'PAYOUT_REQUESTED',
  RejectedCredit = 'REJECTED_CREDIT',
}
