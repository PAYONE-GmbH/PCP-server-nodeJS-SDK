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

import { CardPaymentMethodSpecificInput } from '../models/CardPaymentMethodSpecificInput';
import { FinancingPaymentMethodSpecificInput } from '../models/FinancingPaymentMethodSpecificInput';
import { MobilePaymentMethodSpecificInput } from '../models/MobilePaymentMethodSpecificInput';
import { PaymentChannel } from '../models/PaymentChannel';
import { PaymentEvent } from '../models/PaymentEvent';
import { RedirectPaymentMethodSpecificInput } from '../models/RedirectPaymentMethodSpecificInput';
import { References } from '../models/References';
import { SepaDirectDebitPaymentMethodSpecificInput } from '../models/SepaDirectDebitPaymentMethodSpecificInput';

/**
 * Object contains information of the payment with a specific payment method.
 */
export class PaymentExecution {
  /**
   * Unique ID of paymentExecution.
   */
  'paymentExecutionId'?: string;
  /**
   * Unique payment transaction identifier of the payment gateway.
   */
  'paymentId'?: string;
  'cardPaymentMethodSpecificInput'?: CardPaymentMethodSpecificInput;
  'mobilePaymentMethodSpecificInput'?: MobilePaymentMethodSpecificInput;
  'redirectPaymentMethodSpecificInput'?: RedirectPaymentMethodSpecificInput;
  'sepaDirectDebitPaymentMethodSpecificInput'?: SepaDirectDebitPaymentMethodSpecificInput;
  'financingPaymentMethodSpecificInput'?: FinancingPaymentMethodSpecificInput;
  'paymentChannel'?: PaymentChannel;
  'references'?: References;
  'events'?: Array<PaymentEvent>;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'paymentExecutionId',
      baseName: 'paymentExecutionId',
      type: 'string',
      format: 'UUID',
    },
    {
      name: 'paymentId',
      baseName: 'paymentId',
      type: 'string',
      format: '',
    },
    {
      name: 'cardPaymentMethodSpecificInput',
      baseName: 'cardPaymentMethodSpecificInput',
      type: 'CardPaymentMethodSpecificInput',
      format: '',
    },
    {
      name: 'mobilePaymentMethodSpecificInput',
      baseName: 'mobilePaymentMethodSpecificInput',
      type: 'MobilePaymentMethodSpecificInput',
      format: '',
    },
    {
      name: 'redirectPaymentMethodSpecificInput',
      baseName: 'redirectPaymentMethodSpecificInput',
      type: 'RedirectPaymentMethodSpecificInput',
      format: '',
    },
    {
      name: 'sepaDirectDebitPaymentMethodSpecificInput',
      baseName: 'sepaDirectDebitPaymentMethodSpecificInput',
      type: 'SepaDirectDebitPaymentMethodSpecificInput',
      format: '',
    },
    {
      name: 'financingPaymentMethodSpecificInput',
      baseName: 'financingPaymentMethodSpecificInput',
      type: 'FinancingPaymentMethodSpecificInput',
      format: '',
    },
    {
      name: 'paymentChannel',
      baseName: 'paymentChannel',
      type: 'PaymentChannel',
      format: '',
    },
    {
      name: 'references',
      baseName: 'references',
      type: 'References',
      format: '',
    },
    {
      name: 'events',
      baseName: 'events',
      type: 'Array<PaymentEvent>',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return PaymentExecution.attributeTypeMap;
  }

  public constructor() {}
}
