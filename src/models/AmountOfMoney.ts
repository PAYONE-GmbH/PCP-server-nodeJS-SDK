/** @description Object containing amount and ISO currency code attributes */
export interface AmountOfMoney {
  /**
   * Format: int64
   * @description Amount in cents and always having 2 decimals
   * @example 1000
   */
  amount: number;
  /**
   * @description Three-letter ISO currency code representing the currency for the amount
   * @example EUR
   */
  currencyCode: string;
}
