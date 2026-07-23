import type { CartItemData } from './CartItemData.js';
import type { CartItemSupplierReferences } from './CartItemSupplierReferences.js';

/** @description This object contains information of all items in the cart. If a cart item is provided, the productPrice and quantity is required. */
export interface CartItemInput extends CartItemData {
  supplierReferences?: CartItemSupplierReferences;
}
