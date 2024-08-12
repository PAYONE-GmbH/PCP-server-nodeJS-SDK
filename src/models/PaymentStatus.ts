/**
 * @description
 *     - WAITING_FOR_PAYMENT - There does not yet exist a PaymentExecution nor a PaymentInformation for this
 *     Checkout.
 *     - PAYMENT_NOT_COMPLETED - There exists a PaymentExecution or a PaymentInformation for this Checkout, but all
 *     or some part of the total amount is still unpaid.
 *     - PAYMENT_COMPLETED - There exists a PaymentExecution or a PaymentInformation for this Checkout and the
 *     total amount is fully paid.
 *     - NO_PAYMENT - Checkout was created and deleted. No Payment Execution and no other actions can be triggered
 *     on the Checkout.
 * @example WAITING_FOR_PAYMENT
 */
export enum PaymentStatus {
  WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
  PAYMENT_NOT_COMPLETED = 'PAYMENT_NOT_COMPLETED',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  NO_PAYMENT = 'NO_PAYMENT',
}
