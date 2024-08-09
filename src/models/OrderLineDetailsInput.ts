import type { ProductType } from './ProductType.js';

/** @description Object containing additional information that when supplied can have a beneficial effect on the discountrates. */
export interface OrderLineDetailsInput {
  /**
   * @description Product or UPC Code
   * @example ASP01
   */
  productCode?: string;
  /**
   * Format: int64
   * @description The price of one unit of the product, the value should be zero or greater.
   * @example 480
   */
  productPrice: number;
  productType?: ProductType;
  /**
   * Format: int64
   * @description Quantity of the units being purchased, should be greater than zero
   *     Note: Must not be all spaces or all zeros
   * @example 1
   */
  quantity: number;
  /**
   * Format: int64
   * @description Tax on the line item, with the last two digits implied as decimal places
   * @example 0
   */
  taxAmount?: number;
  /**
   * Format: uri
   * @description URL of the product in shop.
   *
   *     Used for PAYONE Buy Now, Pay Later (BNPL).
   * @example https://shop.url/watches/watch01
   */
  productURL?: string;
  /**
   * Format: uri
   * @description URL of a product image.
   *
   *     Used for PAYONE Buy Now, Pay Later (BNPL).
   * @example https://shop.url/watches/watch01.jpg
   */
  productImageUrl?: string;
  /**
   * @description Category path of the item.
   *
   *     Used for PAYONE Buy Now, Pay Later (BNPL).
   * @example Watches > Smartwatches
   */
  productCategoryPath?: string;
  /**
   * @description Optional parameter to define the delivery shop or touchpoint where an item has been collected (e.g. for
   *     Click & Collect or Click & Reserve).
   * @example Store-12345
   */
  merchantShopDeliveryReference?: string;
}
