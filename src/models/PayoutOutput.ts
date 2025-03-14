import type { AmountOfMoney } from './AmountOfMoney.js';
import type { PaymentReferences } from './PaymentReferences.js';

/**
 * Object containing details from the created payout.
 */
export interface PayoutOutput {
  /**
   * Amount of money details.
   */
  amountOfMoney?: AmountOfMoney;

  /**
   * Payment references associated with the payout.
   */
  references?: PaymentReferences;

  /**
   * Payment method identifier based on the paymentProductId.
   */
  paymentMethod?: string;
}
