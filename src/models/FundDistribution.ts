/** @description Instructions for distributing funds to multiple sellers or partners in a marketplace context. */
export interface FundDistribution {
  /**
   * Format: UUID
   * @readonly
   */
  id?: string;

  /**
   * @description Unique identifier of the beneficiary (seller/partner/sub-account) to receive funds (e.g., payout account ID).
   */
  accountId: string;

  /**
   * @description Human-readable description for reconciliation. Appears on reports.
   * @maxLength 128
   * @example Commission for order #ORD-2025-0001
   */
  description?: string;

  /**
   * Format: int64
   * @description Amount in cents and always having 2 decimals, in the currency of the original transaction
   * @maximum 999999999999
   * @minimum 1
   * @example 1000
   */
  amount: number;

  /**
   * @description Classification or purpose of the fund distribution to the receiving account within a given order.
   */
  type: FundDistributionType;

  /**
   * @description Unique reference of the part of the fund/payment to be distributed that is also returned for reporting and reconciliation purposes.
   * @maxLength 40
   * @example customer-order-1234
   */
  merchantReference?: string;

  /**
   * @description It allows you to store additional parameters for the transaction in JSON format.
   *     This field must not contain any personal data.
   * @maxLength 1000
   * @example {'marketplaceOrderId':'ORD-2025-0001','sellerId':'seller-789'}
   */
  merchantParameters?: string;
}

export enum FundDistributionType {
  SELLER_REVENUE = 'SELLER_REVENUE',
  COMMISSION_FEE = 'COMMISSION_FEE',
  SHIPPING_COSTS = 'SHIPPING_COSTS',
  TAX = 'TAX',
  PLATFORM_FEE = 'PLATFORM_FEE',
  OTHER = 'OTHER',
}
