/** @description Object containing the details of the PayPal account. */
export interface PaymentProduct840CustomerAccount {
  /**
   * @description Name of the company in case the PayPal account is owned by a business
   * @example Customer Company Name
   */
  companyName?: string;
  /**
   * @description First name of the PayPal account holder
   * @example John
   */
  firstName?: string;
  /**
   * @description The unique identifier of a PayPal account and will never change in the life cycle of a PayPal account.
   * @example RRCYJUTFJGZTA
   */
  payerId?: string;
  /**
   * @description Surname of the PayPal account holder
   * @example Doe
   */
  surname?: string;
}
