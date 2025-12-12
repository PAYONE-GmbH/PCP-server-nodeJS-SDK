import type { Payee } from './Payee.js';

/**
 * @description Object containing information on payment instructions details (e.g. on the invoice payments).
 */
export interface PaymentInstructions {
  /**
   * @description Payee details.
   */
  payee: Payee;

  /**
   * @description Due date of the payment in the format: YYYYMMDD.
   * @maxLength 8
   */
  dueDate: string;

  /**
   * @description External payment reference number as part of payment instructions for the consumer.
   */
  referenceNumber: string;

  /**
   * @description Status, usually describing the status of the invoice if paid, overdue, open...
   */
  status?: string;
}
