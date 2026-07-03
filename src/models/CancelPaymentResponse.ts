import type { FundSplit } from './FundSplit.js';
import type { PaymentResponse } from './PaymentResponse.js';

export interface CancelPaymentResponse {
  payment?: PaymentResponse;
  fundSplit?: FundSplit;
}
