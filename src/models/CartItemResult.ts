import type { CartItemInvoiceData } from './CartItemInvoiceData.js';
import type { OrderLineDetailsResult } from './OrderLineDetailsResult.js';

/** @description This object contains information of all items in the cart. If a cart item is provided, the productPrice and quantity is required. */
export interface CartItemResult {
  invoiceData?: CartItemInvoiceData;
  orderLineDetails?: OrderLineDetailsResult;
}
