import type { CartItemInvoiceData } from './CartItemInvoiceData.js';
import type { OrderLineDetailsInput } from './OrderLineDetailsInput.js';

/** @description This object contains information of all items in the cart. */
export interface CartItemData {
  invoiceData?: CartItemInvoiceData;
  orderLineDetails?: OrderLineDetailsInput;
}
