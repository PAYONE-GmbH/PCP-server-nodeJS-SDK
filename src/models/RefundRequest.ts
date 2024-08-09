import type { PaymentReferences } from './PaymentReferences.js';
import type { PositiveAmountOfMoney } from './PositiveAmountOfMoney.js';
import type { ReturnInformation } from './ReturnInformation.js';

/**
 * @description Request to refund a payment for a Checkout. It is possible to perform multiple partial refunds by providing an
 *     amount that is lower than the total captured amount.
 *     The returnReason can be provided for reporting and reconciliation purposes but is not mandatory.
 */
export interface RefundRequest {
  amountOfMoney?: PositiveAmountOfMoney;
  references?: PaymentReferences;
  return?: ReturnInformation;
}
