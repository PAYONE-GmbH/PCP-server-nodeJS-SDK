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

import { CartItemInput } from '../models/CartItemInput';

/**
 * Return object contains additional information about the return/shipment, which is the basis for the Refund. The amountOfMoney in the cartItem will not be used in the request.
 */
export class ReturnInformation {
  /**
   * Reason of the Refund (e.g. communicated by or to the consumer).
   */
  'returnReason'?: string;
  /**
   * Items returned.
   */
  'items'?: Array<CartItemInput>;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'returnReason',
      baseName: 'returnReason',
      type: 'string',
      format: '',
    },
    {
      name: 'items',
      baseName: 'items',
      type: 'Array<CartItemInput>',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return ReturnInformation.attributeTypeMap;
  }

  public constructor() {}
}
