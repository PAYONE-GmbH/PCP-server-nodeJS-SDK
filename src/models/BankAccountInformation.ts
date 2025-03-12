/**
 * @description Object containing information about the end customer's bank account.
 */
export interface BankAccountInformation {
  /**
   * @description IBAN of the end customer's bank account. The IBAN is the International
   * Bank Account Number. It is an internationally agreed format for the BBAN and
   * includes the ISO country code and two check digits.
   */
  iban: string;

  /**
   * @description Bank Identification Code.
   */
  bic?: string;

  /**
   * @description Account holder of the bank account with the given IBAN.
   * Does not necessarily have to be the end customer (e.g., joint accounts).
   */
  accountHolder: string;
}
