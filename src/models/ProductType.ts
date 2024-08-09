/**
 * @description Enum to classify items that are purchased
 *     * GOODS - Goods
 *     * SHIPMENT - Shipping charges
 *     * HANDLING_FEE - Handling fee
 *     * DISCOUNT - Voucher / discount
 */
export enum ProductType {
  GOODS = 'GOODS',
  SHIPMENT = 'SHIPMENT',
  HANDLING_FEE = 'HANDLING_FEE',
  DISCOUNT = 'DISCOUNT',
}
