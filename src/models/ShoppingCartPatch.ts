import type { CartItemPatch } from './CartItemPatch.js';

/** @description Shopping cart data, including items and specific amounts. */
export interface ShoppingCartPatch {
  items?: CartItemPatch[];
}
