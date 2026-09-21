import type { AmountOfMoney } from './AmountOfMoney.js';

/** @description Order details associated with a pay-link. */
export interface PaymentLinkOrder {
  merchantReference?: string;
  amount?: AmountOfMoney;
}
