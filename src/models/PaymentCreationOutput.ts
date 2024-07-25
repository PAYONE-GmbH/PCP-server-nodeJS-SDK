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

/**
 * Object containing the details of the created payment.
 */
export class PaymentCreationOutput {
  /**
   * The external reference is an identifier for this transaction and can be used for reconciliation purposes.
   */
  'externalReference'?: string;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'externalReference',
      baseName: 'externalReference',
      type: 'string',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return PaymentCreationOutput.attributeTypeMap;
  }

  public constructor() {}
}
