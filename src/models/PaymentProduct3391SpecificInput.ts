import type { BankAccountInformation } from './BankAccountInformation.js';

/** @description Object containing specific information for PAYONE Secured Installment. */
export interface PaymentProduct3391SpecificInput {
  /** @description ID of the selected installment option. Will be provided in the response of the Order / Payment Execution request. */
  installmentOptionId: string;
  bankAccountInformation: BankAccountInformation;
}
