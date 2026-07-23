import type { CartItemData } from './CartItemData.js';

/** @description Shopping cart data, including items and specific amounts. */
export interface ShoppingCartData {
  items?: CartItemData[];
}
