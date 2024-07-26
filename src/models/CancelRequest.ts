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

import { CancelItem } from './CancelItem.js';
import { CancelType } from './CancelType.js';
import { CancellationReason } from './CancellationReason.js';

/**
 * Request to mark items as of the respective Checkout as cancelled and to automatically reverse the associated payment.  A Cancel can be created for a full or the partial ShoppingCart of the Checkout.  The platform will automatically calculate the respective amount to trigger the Cancel. For a partial Cancel a list of items must be provided.  The cancellationReason is mandatory for BNPL payment methods (paymentProductId 3390, 3391 and 3392). For other payment methods the cancellationReason is not mandatory but can be used for reporting and reconciliation purposes.
 */
export class CancelRequest {
  'cancelType'?: CancelType;
  'cancellationReason'?: CancellationReason;
  'cancelItems'?: Array<CancelItem>;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'cancelType',
      baseName: 'cancelType',
      type: 'CancelType',
      format: '',
    },
    {
      name: 'cancellationReason',
      baseName: 'cancellationReason',
      type: 'CancellationReason',
      format: '',
    },
    {
      name: 'cancelItems',
      baseName: 'cancelItems',
      type: 'Array<CancelItem>',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return CancelRequest.attributeTypeMap;
  }

  public constructor() {}
}
