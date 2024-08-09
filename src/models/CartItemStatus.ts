/**
 * @description Indicates in which status the line item is
 */
export enum CartItemStatus {
  ORDERED = 'ORDERED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
  WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
}
