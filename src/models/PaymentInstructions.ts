import type { Payee } from './Payee.js';

/**
 * @description Object containing information on payment instructions details (e.g. on invoice payments).
 */
export interface PaymentInstructions {
  /**
   * @description Payee details.
   */
  payee: Payee;

  /**
   * @description Due date of the payment in the format: YYYYMMDD.
   */
  dueDate: string;

  /**
   * @description External payment reference number as part of payment instructions for the consumer.
   */
  referenceNumber: string;

  /**
   * @description Status, usually describing the status of the invoice (e.g., paid, overdue, open).
   */
  status?: string;
}
