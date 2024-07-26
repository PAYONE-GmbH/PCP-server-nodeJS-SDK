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

import { AuthorizationMode } from './AuthorizationMode.js';
import { PaymentProduct320SpecificInput } from './PaymentProduct320SpecificInput.js';

/**
 * Object containing the specific input details for mobile payments.
 */
export class MobilePaymentMethodSpecificInput {
  /**
   * Payment product identifier - please check product documentation for a full overview of possible values.
   */
  'paymentProductId'?: number;
  'authorizationMode'?: AuthorizationMode;
  /**
   * The payment data if we will do the decryption of the encrypted payment data. Typically you\'d use encryptedCustomerInput in the root of the create payment request to provide the encrypted payment data instead.
   */
  'encryptedPaymentData'?: string;
  /**
   * Public Key Hash A unique identifier to retrieve key used by Apple to encrypt information.
   */
  'publicKeyHash'?: string;
  /**
   * Ephemeral Key A unique generated key used by Apple to encrypt data.
   */
  'ephemeralKey'?: string;
  'paymentProduct302SpecificInput'?: PaymentProduct320SpecificInput;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'paymentProductId',
      baseName: 'paymentProductId',
      type: 'number',
      format: 'int32',
    },
    {
      name: 'authorizationMode',
      baseName: 'authorizationMode',
      type: 'AuthorizationMode',
      format: '',
    },
    {
      name: 'encryptedPaymentData',
      baseName: 'encryptedPaymentData',
      type: 'string',
      format: '',
    },
    {
      name: 'publicKeyHash',
      baseName: 'publicKeyHash',
      type: 'string',
      format: '',
    },
    {
      name: 'ephemeralKey',
      baseName: 'ephemeralKey',
      type: 'string',
      format: '',
    },
    {
      name: 'paymentProduct302SpecificInput',
      baseName: 'paymentProduct302SpecificInput',
      type: 'PaymentProduct320SpecificInput',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return MobilePaymentMethodSpecificInput.attributeTypeMap;
  }

  public constructor() {}
}
