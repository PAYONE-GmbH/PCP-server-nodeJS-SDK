import type { AmountOfMoney } from './AmountOfMoney.js';
import type { PaymentReferences } from './PaymentReferences.js';

/** @description Object containing Refund details */
export interface RefundOutput {
  amountOfMoney?: AmountOfMoney;
  /**
   * @description It allows you to store additional parameters for the transaction in JSON format.
   *     This field must not contain any personal data.
   *
   * @example {'SessionID':'126548354','ShopperID':'7354131'}
   */
  merchantParameters?: string;
  references?: PaymentReferences;
  /** @description Payment method identifier used by the our payment engine. */
  paymentMethod?: string;
}
