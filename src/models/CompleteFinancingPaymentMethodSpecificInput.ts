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
 * To complete the Payment the completeFinancingMethodSpecificInput has to be provided. At the moment it is only available for PAYONE Secured Installment (paymentProductId 3391).
 */
export class CompleteFinancingPaymentMethodSpecificInput {
  /**
   * Payment product identifier. Currently supported payment methods: * 3391 - PAYONE Secured Installment
   */
  'paymentProductId'?: number;
  /**
   * * true = the payment requires approval before the funds will be captured using the Approve payment or Capture payment API * false = the payment does not require approval, and the funds will be captured automatically  If the parameter is not provided in the request, the default value will be true
   */
  'requiresApproval'?: boolean;
  'paymentProduct3391SpecificInput'?: PaymentProduct3391SpecificInput;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'paymentProductId',
      baseName: 'paymentProductId',
      type: 'number',
      format: 'int32',
    },
    {
      name: 'requiresApproval',
      baseName: 'requiresApproval',
      type: 'boolean',
      format: '',
    },
    {
      name: 'paymentProduct3391SpecificInput',
      baseName: 'paymentProduct3391SpecificInput',
      type: 'PaymentProduct3391SpecificInput',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return CompleteFinancingPaymentMethodSpecificInput.attributeTypeMap;
  }

  public constructor() {}
}
