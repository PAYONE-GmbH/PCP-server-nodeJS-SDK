import type { PersonalName } from './PersonalName.js';

/** @description Object containing personal or shipping address information. */
export interface AddressPersonal {
  /**
   * @description Second line of street or additional address information such as apartments and suits
   * @example Apartment 203
   */
  additionalInfo?: string;
  /**
   * @description City
   * @example Kiel
   */
  city?: string;
  /**
   * @description ISO 3166-1 alpha-2 country code
   * @example DE
   */
  countryCode?: string;
  /**
   * @description House number
   * @example 3
   */
  houseNumber?: string;
  /**
   * @description State (ISO 3166-2 subdivisions), only if country=US, CA, CN, JP, MX, BR, AR, ID, TH, IN.
   * @example MX
   */
  state?: string;
  /**
   * @description Street name
   * @example Coral Avenue
   */
  street?: string;
  /**
   * @description Zip code
   * @example 1234
   */
  zip?: string;
  name?: PersonalName;
}
