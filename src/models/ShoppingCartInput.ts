import type { CartItemInput } from './CartItemInput.js';

/** @description Shopping cart data, including items and specific amounts. */
export interface ShoppingCartInput {
  items?: CartItemInput[];
}
