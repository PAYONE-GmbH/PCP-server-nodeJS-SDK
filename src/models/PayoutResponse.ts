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

import { PayoutOutput } from './PayoutOutput.js';
import { StatusCategoryValue } from './StatusCategoryValue.js';
import { StatusValue } from './StatusValue.js';

/**
 * Object that holds the payment related properties for the refund of a Payment Information.
 */
export class PayoutResponse {
  'payoutOutput'?: PayoutOutput;
  'status'?: StatusValue;
  'statusCategory'?: StatusCategoryValue;
  /**
   * Unique payment transaction identifier of the payment gateway.
   */
  'id'?: string;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'payoutOutput',
      baseName: 'payoutOutput',
      type: 'PayoutOutput',
      format: '',
    },
    {
      name: 'status',
      baseName: 'status',
      type: 'StatusValue',
      format: '',
    },
    {
      name: 'statusCategory',
      baseName: 'statusCategory',
      type: 'StatusCategoryValue',
      format: '',
    },
    {
      name: 'id',
      baseName: 'id',
      type: 'string',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return PayoutResponse.attributeTypeMap;
  }

  public constructor() {}
}
