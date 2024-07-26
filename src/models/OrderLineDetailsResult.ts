/**
 * Commerce Platform API
 * RESTful API for the creation of Commerce Cases with Checkouts and the execution of Payments.
 *
 * OpenAPI spec version: 1.8.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { CartItemOrderStatus } from './CartItemOrderStatus.js';
import { ProductType } from './ProductType.js';

/**
 * Object containing additional information that when supplied can have a beneficial effect on the discountrates.
 */
export class OrderLineDetailsResult {
  /**
   * Unique identifier of a cart item
   */
  'id'?: string;
  'status'?: Array<CartItemOrderStatus>;
  /**
   * Product or UPC Code
   */
  'productCode'?: string;
  /**
   * The price of one unit of the product, the value should be zero or greater.
   */
  'productPrice': number;
  'productType'?: ProductType;
  /**
   * Quantity of the units being purchased, should be greater than zero Note: Must not be all spaces or all zeros
   */
  'quantity': number;
  /**
   * Tax on the line item, with the last two digits implied as decimal places
   */
  'taxAmount'?: number;
  /**
   * URL of the product in shop.   Used for PAYONE Buy Now, Pay Later (BNPL).
   */
  'productUrl'?: string;
  /**
   * URL of a product image.   Used for PAYONE Buy Now, Pay Later (BNPL).
   */
  'productImageUrl'?: string;
  /**
   * Category path of the item.   Used for PAYONE Buy Now, Pay Later (BNPL).
   */
  'productCategoryPath'?: string;
  /**
   * Optional parameter to define the delivery shop or touchpoint where an item has been collected (e.g. for Click & Collect or Click & Reserve).
   */
  'merchantShopDeliveryReference'?: string;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'id',
      baseName: 'id',
      type: 'string',
      format: 'UUID',
    },
    {
      name: 'status',
      baseName: 'status',
      type: 'Array<CartItemOrderStatus>',
      format: '',
    },
    {
      name: 'productCode',
      baseName: 'productCode',
      type: 'string',
      format: '',
    },
    {
      name: 'productPrice',
      baseName: 'productPrice',
      type: 'number',
      format: 'int64',
    },
    {
      name: 'productType',
      baseName: 'productType',
      type: 'ProductType',
      format: '',
    },
    {
      name: 'quantity',
      baseName: 'quantity',
      type: 'number',
      format: 'int64',
    },
    {
      name: 'taxAmount',
      baseName: 'taxAmount',
      type: 'number',
      format: 'int64',
    },
    {
      name: 'productUrl',
      baseName: 'productUrl',
      type: 'string',
      format: 'uri',
    },
    {
      name: 'productImageUrl',
      baseName: 'productImageUrl',
      type: 'string',
      format: 'uri',
    },
    {
      name: 'productCategoryPath',
      baseName: 'productCategoryPath',
      type: 'string',
      format: '',
    },
    {
      name: 'merchantShopDeliveryReference',
      baseName: 'merchantShopDeliveryReference',
      type: 'string',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return OrderLineDetailsResult.attributeTypeMap;
  }

  public constructor() {}
}
