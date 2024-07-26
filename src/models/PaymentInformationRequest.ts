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

import { AmountOfMoney } from './AmountOfMoney.js';
import { PaymentChannel } from './PaymentChannel.js';
import { PaymentType } from './PaymentType.js';

export class PaymentInformationRequest {
  'amountOfMoney': AmountOfMoney;
  'type': PaymentType;
  'paymentChannel': PaymentChannel;
  /**
   * Payment method identifier - please check the product documentation for a full overview of possible values.
   */
  'paymentProductId': number;
  /**
   * Unique reference of the PaymentInformation. In case of card present transactions, the reference from the ECR or terminal will be used. It is always the reference for external transactions. (e.g. card present payments, cash payments or payments processed by other payment providers).
   */
  'merchantReference'?: string;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'amountOfMoney',
      baseName: 'amountOfMoney',
      type: 'AmountOfMoney',
      format: '',
    },
    {
      name: 'type',
      baseName: 'type',
      type: 'PaymentType',
      format: '',
    },
    {
      name: 'paymentChannel',
      baseName: 'paymentChannel',
      type: 'PaymentChannel',
      format: '',
    },
    {
      name: 'paymentProductId',
      baseName: 'paymentProductId',
      type: 'number',
      format: 'int32',
    },
    {
      name: 'merchantReference',
      baseName: 'merchantReference',
      type: 'string',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return PaymentInformationRequest.attributeTypeMap;
  }

  public constructor() {}
}
