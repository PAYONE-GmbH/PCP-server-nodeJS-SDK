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

import { Address } from './Address.js';
import { PaymentProduct840CustomerAccount } from './PaymentProduct840CustomerAccount.js';

/**
 * PayPal (payment product 840) specific details.
 */
export class PaymentProduct840SpecificOutput {
  'billingAddress'?: Address;
  'customerAccount'?: PaymentProduct840CustomerAccount;
  'shippingAddress'?: Address;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'billingAddress',
      baseName: 'billingAddress',
      type: 'Address',
      format: '',
    },
    {
      name: 'customerAccount',
      baseName: 'customerAccount',
      type: 'PaymentProduct840CustomerAccount',
      format: '',
    },
    {
      name: 'shippingAddress',
      baseName: 'shippingAddress',
      type: 'Address',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return PaymentProduct840SpecificOutput.attributeTypeMap;
  }

  public constructor() {}
}
