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
 * The deliverType refers to the ShoppingCart items of the Checkout.      deliverType = FULL should be provided if all items should be marked as delivered and the payment for the entire ShoppingCart should be captured.         deliverType = PARTIAL should be provided if only certain items should be marked as delivered and the Capture should not be made for the entire ShoppingCart. For this type the list of items has to be provided.         Following conditions apply to the Deliver request:   * items must be in status ORDERED   * there was no Capture, Refund or Cancel triggered over the Payment Execution resource   * for the deliverType FULL no items are provided in the request Note: If a DISCOUNT productType is among the ShoppingCart items, only deliverType FULL is possible.
 */
export enum DeliverType {
  Full = 'FULL',
  Partial = 'PARTIAL',
}
