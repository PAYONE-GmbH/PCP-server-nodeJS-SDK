/**
 * @description Payee bank account details as part of the payment instructions.
 */
export interface Payee {
  /**
   * @description IBAN of the payee's or beneficiary's bank account.
   * The IBAN is the International Bank Account Number. It is an internationally agreed format for
   * the BBAN and includes the ISO country code and two check digits.
   * @maxLength 50
   * @example DE02370502990000684712
   */
  iban: string;

  /**
   * @description Bank Identification Code.
   * @maxLength 11
   * @example COKSDE33XXX
   */
  bic?: string;

  /**
   * @description Name of the payee.
   * @example Max Mustermann
   */
  name: string;
}
