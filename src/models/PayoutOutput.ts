import type { AmountOfMoney } from './AmountOfMoney.js';
import type { PaymentReferences } from './PaymentReferences.js';

/**
 * @description Object containing details from the created payout.
 */
export interface PayoutOutput {
  /**
   * @description Amount of money details.
   */
  amountOfMoney?: AmountOfMoney;

  /**
   * @description Payment references associated with the payout.
   */
  references?: PaymentReferences;

  /**
   * @description Payment method identifier based on the paymentProductId.
   */
  paymentMethod?: string;
}
