/** @description Items should only be provided for orderType = PARTIAL */
export interface OrderItem {
  /**
   * Format: UUID
   * @description Id of the item from the ShoppingCart. The id will be returned in the response from create Checkout request.
   * @example 4f0c512e-f12c-11ec-8ea0-0242ac120002
   */
  id: string;
  /**
   * Format: int64
   * @description Quantity of the specific item. Must be greater than zero.
   *     Note: Must not be all spaces or all zeros
   *
   * @example 1
   */
  quantity: number;
}
