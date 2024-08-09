import type { ProcessingMandateInformation } from './ProcessingMandateInformation.js';

/** @description Object containing information specific to SEPA Direct Debit */
export interface SepaDirectDebitPaymentProduct771SpecificInput {
  /**
   * @description The unique reference of the existing mandate to use in this payment.
   * @example exampleMandateReference
   */
  existingUniqueMandateReference?: string;
  mandate?: ProcessingMandateInformation;
}
