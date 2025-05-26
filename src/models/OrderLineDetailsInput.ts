import type { ProductType } from './ProductType.js';

/**
 * @description Object containing additional information that when supplied can have a
 * beneficial effect on the discount rates.
 */
export interface OrderLineDetailsInput {
  /**
   * @description Product or UPC Code.
   */
  productCode?: string;

  /**
   * @description The price of one unit of the product, the value should be zero or greater.
   * @minimum 0
   * @maximum 2147483647
   */
  productPrice: number;

  /**
   * @description Type of product.
   */
  productType?: ProductType;

  /**
   * @description Quantity of the units being purchased, should be greater than zero.
   * Note: Must not be all spaces or all zeros.
   * @minimum 0
   * @maximum 9999
   */
  quantity: number;

  /**
   * @description Tax on the line item, with the last two digits implied as decimal places.
   * @minimum 0
   * @maximum 2147483647
   */
  taxAmount?: number;

  /**
   * @description This field indicates if the `taxAmount` is to be interpreted as the tax
   * amount per unit rather than for the entire line item. This field is included in the
   * response only when `taxAmount` is set; otherwise, it will return as `null`.
   */
  taxAmountPerUnit?: boolean;

  /**
   * @description URL of the product in the shop. Used for PAYONE Buy Now, Pay Later (BNPL).
   */
  productUrl?: string;

  /**
   * @description URL of a product image. Used for PAYONE Buy Now, Pay Later (BNPL).
   */
  productImageUrl?: string;

  /**
   * @description Category path of the item. Used for PAYONE Buy Now, Pay Later (BNPL).
   */
  productCategoryPath?: string;

  /**
   * @description Optional parameter to define the delivery shop or touchpoint where an item
   * has been collected (e.g., for Click & Collect or Click & Reserve).
   */
  merchantShopDeliveryReference?: string;
}
