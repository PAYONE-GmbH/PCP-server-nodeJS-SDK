import type { Address } from './Address.js';
import type { CompanyInformation } from './CompanyInformation.js';
import type { ContactDetails } from './ContactDetails.js';
import type { PersonalInformation } from './PersonalInformation.js';

/** @description Object containing the details of a customer. */
export interface Customer {
  companyInformation?: CompanyInformation;
  /**
   * @description Unique identifier for the customer.
   * @example 1234
   */
  merchantCustomerId?: string;
  billingAddress?: Address;
  contactDetails?: ContactDetails;
  /**
   * @description Fiscal registration number of the customer or the tax registration number of the company for a business
   *     customer. Please find below specifics per country:
   *      * Brazil - Consumer (CPF) with a length of 11 digits
   *      * Brazil - Company (CNPJ) with a length of 14 digits
   *      * Denmark - Consumer (CPR-nummer or personnummer) with a length of 10 digits
   *      * Finland - Consumer (Finnish: henkilötunnus (abbreviated as HETU), Swedish: personbeteckning) with a
   *     length of 11 characters
   *      * Norway - Consumer (fødselsnummer) with a length of 11 digits
   *      * Sweden - Consumer (personnummer) with a length of 10 or 12 digits
   */
  fiscalNumber?: string;
  /**
   * @description Business relation to the customer. Possible values:
   *     * B2C - Indicates business to consumer
   *     * B2B - Indicates business to business
   *
   *     Mandatory for the the following payment methods:
   *     * 3390 - PAYONE Secured Invoice
   *     * 3391 - PAYONE Secured Installment
   *     * 3392 - PAYONE Secured Direct Debit
   */
  businessRelation?: string;
  /**
   * @description The locale that the customer should be addressed in (for 3rd parties).
   *
   *     Note: Only the language code is supported.
   * @example de
   */
  locale?: string;
  personalInformation?: PersonalInformation;
}
