/** @description Object containing contact details like email address and phone number. */
export interface ContactDetails {
  /**
   * @description Email address of the customer
   * @example wile.e.coyote@acmelabs.com
   */
  emailAddress?: string;
  /**
   * @description Phone number of the customer
   * @example +1234567890
   */
  phoneNumber?: string;
}
