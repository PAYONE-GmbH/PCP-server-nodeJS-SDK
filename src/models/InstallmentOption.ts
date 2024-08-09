import type { AmountOfMoney } from './AmountOfMoney.js';
import type { LinkInformation } from './LinkInformation.js';

export interface InstallmentOption {
  /**
   * @description Installment option Identifier. Use this in the Complete Payment for the selected installment option.
   * @example IOP_478d44fea0494eea86bc87f9e4a63328
   */
  installmentOptionId: string;
  /**
   * Format: int32
   * @description The number of monthly payments for this installment.
   * @example 12
   */
  numberOfPayments: number;
  /** @description Monthly rate amount. */
  monthlyAmount: AmountOfMoney;
  /** @description Last rate amount. */
  lastRateAmount: AmountOfMoney;
  /**
   * Format: int32
   * @description Effective interest amount in percent with two decimals.
   * @example 1209
   */
  effectiveInterestRate: number;
  /**
   * Format: int32
   * @description Nominal interest amount in percent with two decimals.
   * @example 1199
   */
  nominalInterestRate: number;
  /** @description Total rate amount. */
  totalAmount: AmountOfMoney;
  /** @description Due date of first rate.
   *     Format: YYYYMMDD */
  firstRateDate: string;
  /** @description Link with credit information. */
  creditInformation: LinkInformation;
}
