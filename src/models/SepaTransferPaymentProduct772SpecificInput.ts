import type { BankAccountInformation } from './BankAccountInformation.js';

/**
 * Object containing the specific input details for SEPA credit transfers excluding cross-border ones.
 */
export interface SepaTransferPaymentProduct772SpecificInput {
  /**
   * Bank account information for the SEPA transfer.
   */
  bankAccountInformation?: BankAccountInformation;
}
