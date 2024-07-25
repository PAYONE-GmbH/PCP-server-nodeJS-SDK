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
 * Reason why an order was cancelled. Possible values:         * CONSUMER_REQUEST - The consumer requested a cancellation of the Order * UNDELIVERABLE - The merchant cannot fulfill the Order * DUPLICATE - The Order was created twice accidentally * FRAUDULENT- Consumer turned out to be a fraudster * ORDER_SHIPPED_IN_FULL - The merchant shipped everything and wants to cancel the remaining authorized amount of the Order * AUTOMATED_SHIPMENT_FAILED - A technical error was thrown during an automated shipment API call rendering the Order impossible to complete  Mandatory for PAYONE Buy Now, Pay Later (BNPL): * 3390 - PAYONE Secured Invoice * 3391 - PAYONE Secured Installment * 3392 - PAYONE Secured Direct Debit
 */
export enum CancellationReason {
  ConsumerRequest = 'CONSUMER_REQUEST',
  Undeliverable = 'UNDELIVERABLE',
  Duplicate = 'DUPLICATE',
  Fraudulent = 'FRAUDULENT',
  OrderShippedInFull = 'ORDER_SHIPPED_IN_FULL',
  AutomatedShipmentFailed = 'AUTOMATED_SHIPMENT_FAILED',
}
