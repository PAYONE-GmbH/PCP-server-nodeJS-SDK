/**
 * Commerce Platform API
 * RESTful API for the creation of Commerce Cases with Checkouts and the execution of Payments.
 *
 * OpenAPI spec version: 1.8.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { PaymentProduct771SpecificOutput } from '../models/PaymentProduct771SpecificOutput';

/**
 * Object containing the SEPA direct debit details.
 */
export class SepaDirectDebitPaymentMethodSpecificOutput {
  /**
   * Payment product identifier - please check product documentation for a full overview of possible values.
   */
  'paymentProductId'?: number;
  'paymentProduct771SpecificOutput'?: PaymentProduct771SpecificOutput;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'paymentProductId',
      baseName: 'paymentProductId',
      type: 'number',
      format: 'int32',
    },
    {
      name: 'paymentProduct771SpecificOutput',
      baseName: 'paymentProduct771SpecificOutput',
      type: 'PaymentProduct771SpecificOutput',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return SepaDirectDebitPaymentMethodSpecificOutput.attributeTypeMap;
  }

  public constructor() {}
}
