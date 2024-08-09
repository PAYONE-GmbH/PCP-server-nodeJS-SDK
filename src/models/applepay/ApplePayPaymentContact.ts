/**
 * The result of authorizing a payment request that contains payment information.
 *
 * Data in ApplePayPaymentToken is encrypted. Billing and shipping contact data are not encrypted.
 */
export interface ApplePayPaymentContact {
  /**
   * @description A phone number for the contact.
   */
  phoneNumber?: string;

  /**
   * @description An email address for the contact.
   */
  emailAddress?: string;

  /**
   * @description The contact’s given name.
   */
  givenName?: string;

  /**
   * @description The contact’s family name.
   */
  familyName?: string;

  /**
   * @description The phonetic spelling of the contact’s given name.
   */
  phoneticGivenName?: string;

  /**
   * @description The phonetic spelling of the contact’s family name.
   */
  phoneticFamilyName?: string;

  /**
   * @description The street portion of the address for the contact.
   */
  addressLines?: string[];

  /**
   * @description The city for the contact.
   */
  locality?: string;

  /**
   * @description The zip code or postal code, where applicable, for the contact.
   */
  postalCode?: string;

  /**
   * @description The state for the contact.
   */
  administrativeArea?: string;

  /**
   * @description The subadministrative area (such as a county or other region) in a postal address.
   */
  subAdministrativeArea?: string;

  /**
   * @description The name of the country or region for the contact.
   */
  country?: string;

  /**
   * @description The contact’s two-letter ISO 3166 country code.
   */
  countryCode?: string;
}
