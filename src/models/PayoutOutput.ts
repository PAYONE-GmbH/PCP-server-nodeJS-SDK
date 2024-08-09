import type { AmountOfMoney } from './AmountOfMoney.js';
import type { PaymentReferences } from './PaymentReferences.js';

/** @description Object containing details from the created payout. */
export interface PayoutOutput {
  amountOfMoney?: AmountOfMoney;
  references?: PaymentReferences;
  /** @description Payment method identifier based on the paymentProductId. */
  paymentMethod?: string;
}
