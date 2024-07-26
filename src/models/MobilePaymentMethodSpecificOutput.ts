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

import { CardFraudResults } from './CardFraudResults.js';
import { ThreeDSecureResults } from './ThreeDSecureResults.js';

/**
 * Object containing the mobile payment method details.
 */
export class MobilePaymentMethodSpecificOutput {
  /**
   * Payment product identifier - please check product documentation for a full overview of possible values.
   */
  'paymentProductId'?: number;
  /**
   * Card Authorization code as returned by the acquirer
   */
  'authorisationCode'?: string;
  'fraudResults'?: CardFraudResults;
  'threeDSecureResults'?: ThreeDSecureResults;
  /**
   * The card network that was used for a mobile payment method operation
   */
  'network'?: string;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'paymentProductId',
      baseName: 'paymentProductId',
      type: 'number',
      format: 'int32',
    },
    {
      name: 'authorisationCode',
      baseName: 'authorisationCode',
      type: 'string',
      format: '',
    },
    {
      name: 'fraudResults',
      baseName: 'fraudResults',
      type: 'CardFraudResults',
      format: '',
    },
    {
      name: 'threeDSecureResults',
      baseName: 'threeDSecureResults',
      type: 'ThreeDSecureResults',
      format: '',
    },
    {
      name: 'network',
      baseName: 'network',
      type: 'string',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return MobilePaymentMethodSpecificOutput.attributeTypeMap;
  }

  public constructor() {}
}
