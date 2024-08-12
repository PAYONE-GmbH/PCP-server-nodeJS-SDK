import type { CartItemStatus } from './CartItemStatus.js';

/** @description Detailed information regarding an occurred payment event. */
export interface CartItemOrderStatus {
  cartItemStatus?: CartItemStatus;
  /**
   * Format: int64
   * @description Amount of units for which this status is applicable, should be greater than zero
   * @example 1
   */
  quantity?: number;
}
