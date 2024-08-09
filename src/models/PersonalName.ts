/** @description Object containing the name details of the customer */
export interface PersonalName {
  /**
   * @description Given name(s) or first name(s) of the customer
   * @example Wile
   */
  firstName?: string;
  /**
   * @description Surname(s) or last name(s) of the customer
   * @example E. Coyote
   */
  surname?: string;
  /**
   * @description Title of customer
   * @example Dr.
   */
  title?: string;
}
