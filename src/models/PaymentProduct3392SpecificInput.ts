import type { BankAccountInformation } from './BankAccountInformation.js';

/** @description Object containing specific information for PAYONE Secured Direct. Debit. */
export interface PaymentProduct3392SpecificInput {
  bankAccountInformation: BankAccountInformation;
}
