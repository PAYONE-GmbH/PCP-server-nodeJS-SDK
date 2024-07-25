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

import { CartItemPatch } from '../models/CartItemPatch';

/**
 * Shopping cart data, including items and specific amounts.
 */
export class ShoppingCartPatch {
  'items'?: Array<CartItemPatch>;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'items',
      baseName: 'items',
      type: 'Array<CartItemPatch>',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return ShoppingCartPatch.attributeTypeMap;
  }

  public constructor() {}
}
