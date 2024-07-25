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

/**
 * Contains information about whether the payment of the Checkout has already been completed and how much of the total sum has been collected already.
 */
export class StatusOutput {
  /**
   * * WAITING_FOR_PAYMENT - There does not yet exist a PaymentExecution nor a PaymentInformation for this Checkout. * PAYMENT_NOT_COMPLETED - There exists a PaymentExecution or a PaymentInformation for this Checkout, but all or some part of the total amount is still unpaid. * PAYMENT_COMPLETED - There exists a PaymentExecution or a PaymentInformation for this Checkout and the total amount is fully paid. * NO_PAYMENT - Checkout was created and deleted. No Payment Execution and no other actions can be triggered on the Checkout.
   */
  'paymentStatus'?: StatusOutputPaymentStatusEnum;
  /**
   * Indicates whether the Checkout can still be modified. False if any payment is already in progress, true otherwise.
   */
  'isModifiable'?: boolean;
  /**
   * Amount in cents always having 2 decimals. The amount yet to be paid.
   */
  'openAmount'?: number;
  /**
   * Amount in cents always having 2 decimals. The amount that has already been collected.
   */
  'collectedAmount'?: number;
  /**
   * Amount in cents always having 2 decimals. The amount that has already been cancelled.
   */
  'cancelledAmount'?: number;
  /**
   * Amount in cents always having 2 decimals. Amount that has been collected but was refunded to the customer.
   */
  'refundedAmount'?: number;
  /**
   * Amount in cents always having 2 decimals. Amount that has been collected but was charged back by the customer.
   */
  'chargebackAmount'?: number;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'paymentStatus',
      baseName: 'paymentStatus',
      type: 'StatusOutputPaymentStatusEnum',
      format: '',
    },
    {
      name: 'isModifiable',
      baseName: 'isModifiable',
      type: 'boolean',
      format: '',
    },
    {
      name: 'openAmount',
      baseName: 'openAmount',
      type: 'number',
      format: 'int64',
    },
    {
      name: 'collectedAmount',
      baseName: 'collectedAmount',
      type: 'number',
      format: 'int64',
    },
    {
      name: 'cancelledAmount',
      baseName: 'cancelledAmount',
      type: 'number',
      format: 'int64',
    },
    {
      name: 'refundedAmount',
      baseName: 'refundedAmount',
      type: 'number',
      format: 'int64',
    },
    {
      name: 'chargebackAmount',
      baseName: 'chargebackAmount',
      type: 'number',
      format: 'int64',
    },
  ];

  static getAttributeTypeMap() {
    return StatusOutput.attributeTypeMap;
  }

  public constructor() {}
}

export enum StatusOutputPaymentStatusEnum {
  WaitingForPayment = 'WAITING_FOR_PAYMENT',
  PaymentNotCompleted = 'PAYMENT_NOT_COMPLETED',
  PaymentCompleted = 'PAYMENT_COMPLETED',
  NoPayment = 'NO_PAYMENT',
}
