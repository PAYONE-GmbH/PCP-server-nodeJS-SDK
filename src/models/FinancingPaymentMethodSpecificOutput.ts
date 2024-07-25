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

import { PaymentProduct3391SpecificOutput } from '../models/PaymentProduct3391SpecificOutput';

/**
 * Object containing the specific output details for financing payment methods (Buy Now Pay Later)
 */
export class FinancingPaymentMethodSpecificOutput {
  /**
   * Payment product identifier - please check product documentation for a full overview of possible values. Currently supported payment methods * 3390 - PAYONE Secured Invoice * 3391 - PAYONE Secured Installment * 3392 - PAYONE Secured Direct Debit
   */
  'paymentProductId'?: number;
  'paymentProduct3391SpecificOutput'?: PaymentProduct3391SpecificOutput;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'paymentProductId',
      baseName: 'paymentProductId',
      type: 'number',
      format: 'int32',
    },
    {
      name: 'paymentProduct3391SpecificOutput',
      baseName: 'paymentProduct3391SpecificOutput',
      type: 'PaymentProduct3391SpecificOutput',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return FinancingPaymentMethodSpecificOutput.attributeTypeMap;
  }

  public constructor() {}
}
