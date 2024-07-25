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

import { RefundPaymentResponse } from '../models/RefundPaymentResponse';
import { ShoppingCartResult } from '../models/ShoppingCartResult';

export class ReturnResponse {
  'returnPaymentResponse'?: RefundPaymentResponse;
  'shoppingCart'?: ShoppingCartResult;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'returnPaymentResponse',
      baseName: 'returnPaymentResponse',
      type: 'RefundPaymentResponse',
      format: '',
    },
    {
      name: 'shoppingCart',
      baseName: 'shoppingCart',
      type: 'ShoppingCartResult',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return ReturnResponse.attributeTypeMap;
  }

  public constructor() {}
}
