import type { AmountOfMoney } from './AmountOfMoney.js';
import type { PaymentId } from './PaymentId.js';
import type { PaymentIntentId } from './PaymentIntentId.js';
import type { PaymentReferences } from './PaymentReferences.js';

/** @description Object containing details for a payment intent. */
export interface PaymentIntentResponseData {
  amountOfMoney?: AmountOfMoney;
  references?: PaymentReferences;
  paymentIntentId?: PaymentIntentId;
  paymentId?: PaymentId;
}
