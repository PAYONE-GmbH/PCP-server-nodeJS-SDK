import type { CartItemOrderStatus } from './CartItemOrderStatus.js';
import type { OrderLineDetailsInput } from './OrderLineDetailsInput.js';

/** @description Object containing additional information that when supplied can have a beneficial effect on the discountrates. */
export interface OrderLineDetailsPatch extends OrderLineDetailsInput {
  /**
   * Format: UUID
   * @description Unique identifier of a cart item
   * @example 7a3444d3-f6ce-4b6e-b6c4-2486a160cf19
   */
  id?: string;
  status?: CartItemOrderStatus[];
}
