/** @description This object contains references of the seller of the cart item. */
export interface CartItemSupplierReferences {
  /**
   * @description Unique identifier for the supplier. Used for reporting to identify to which supplier the item belongs.
            Only allowed for marketplace merchants or if feature to ignore Marketplace fields is enabled in configuration.
   * @maxLength 64
   * @example 5678
   */
  supplierId: string;

  /**
   * @description Reference of the order for the supplier.
   * @maxLength 64
   * @example Order-5678
   */
  orderReference?: string;
}
