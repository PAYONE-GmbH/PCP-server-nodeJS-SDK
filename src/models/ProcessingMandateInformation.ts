import type { BankAccountInformation } from './BankAccountInformation.js';
import type { MandateRecurrenceType } from './MandateRecurrenceType.js';

/**
 * @description Object containing the relevant information of a SEPA Direct Debit
 *     mandate for processing (mandatory fields in pain.008).
 *     Renamed from CreateMandateWithReturnUrl to ProcessingMandateInformation.
 */
export interface ProcessingMandateInformation {
  bankAccountIban: BankAccountInformation;
  recurrenceType: MandateRecurrenceType;
  /**
   * @description The unique identifier of the mandate
   * @example your-mandate-id
   */
  uniqueMandateReference: string;
  /**
   * @description The date of signature of the mandate.
   *     Format YYYYMMDD
   * @example 20220101
   */
  dateOfSignature: string;
  /**
   * @description Your unique creditor identifier.
   * @example DE98ZZZ09999999999
   */
  creditorId: string;
}
