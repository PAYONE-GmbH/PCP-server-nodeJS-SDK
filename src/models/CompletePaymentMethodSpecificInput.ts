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

import { PaymentProduct3391SpecificInput } from './PaymentProduct3391SpecificInput.js';

/**
 * To complete the Order the completePaymentMethodSpecificInput has to be provided, containing the selected installmentOptionId as well as the the bankAccountInformation of the customer.
 */
export class CompletePaymentMethodSpecificInput {
  'paymentProduct3391SpecificInput'?: PaymentProduct3391SpecificInput;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'paymentProduct3391SpecificInput',
      baseName: 'paymentProduct3391SpecificInput',
      type: 'PaymentProduct3391SpecificInput',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return CompletePaymentMethodSpecificInput.attributeTypeMap;
  }

  public constructor() {}
}
