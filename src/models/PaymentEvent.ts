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
import { CancellationReason } from './CancellationReason.js';
import { PaymentType } from './PaymentType.js';
import { StatusValue } from './StatusValue.js';

/**
 * Detailed information regarding an occurred payment event.
 */
export class PaymentEvent {
  'type'?: PaymentType;
  'amountOfMoney'?: AmountOfMoney;
  'paymentStatus'?: StatusValue;
  'cancellationReason'?: CancellationReason;
  /**
   * Reason of the Refund (e.g. communicated by or to the costumer).
   */
  'returnReason'?: string;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'type',
      baseName: 'type',
      type: 'PaymentType',
      format: '',
    },
    {
      name: 'amountOfMoney',
      baseName: 'amountOfMoney',
      type: 'AmountOfMoney',
      format: '',
    },
    {
      name: 'paymentStatus',
      baseName: 'paymentStatus',
      type: 'StatusValue',
      format: '',
    },
    {
      name: 'cancellationReason',
      baseName: 'cancellationReason',
      type: 'CancellationReason',
      format: '',
    },
    {
      name: 'returnReason',
      baseName: 'returnReason',
      type: 'string',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return PaymentEvent.attributeTypeMap;
  }

  public constructor() {}
}
