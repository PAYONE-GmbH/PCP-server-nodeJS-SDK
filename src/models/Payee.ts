/**
 * @description Payee bank account details as part of the payment instructions.
 */
export interface Payee {
  /**
   * @description IBAN of the payee's or beneficiary's bank account.
   * The IBAN is the International Bank Account Number. It is an internationally agreed format for
   * the BBAN and includes the ISO country code and two check digits.
   */
  iban: string;

  /**
   * @description Bank Identification Code.
   */
  bic?: string;

  /**
   * @description Name of the payee.
   */
  name: string;
}
