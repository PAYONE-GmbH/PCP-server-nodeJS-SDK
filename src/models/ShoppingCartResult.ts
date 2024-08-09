import type { CartItemResult } from './CartItemResult.js';

/** @description Shopping cart data, including items and specific amounts. */
export interface ShoppingCartResult {
  items?: CartItemResult[];
}
