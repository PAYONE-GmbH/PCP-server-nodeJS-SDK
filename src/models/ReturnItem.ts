export interface ReturnItem {
  /**
   * Format: UUID
   * @description Id of the item to return.
   * @example 4f0c512e-f12c-11ec-8ea0-0242ac120002
   */
  id: string;
  /**
   * Format: int64
   * @description Quantity of the units being returned, should be greater than zero
   *     Note: Must not be all spaces or all zeros
   * @example 1
   */
  quantity: number;
}
