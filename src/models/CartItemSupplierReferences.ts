/** @description This object contains references of the seller of the cart item. */
export interface CartItemSupplierReferences {
  /**
   * @description Unique identifier for the supplier.
   * @maxLength 64
   * @example 5678
   */
  supplierId?: string;

  /**
   * @description Reference of the order for the supplier.
   * @maxLength 64
   * @example Order-5678
   */
  orderReference?: string;
}
