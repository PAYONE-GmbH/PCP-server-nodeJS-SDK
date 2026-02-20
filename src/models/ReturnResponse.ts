import type { FundSplit } from './FundSplit.js';
import type { RefundPaymentResponse } from './RefundPaymentResponse.js';
import type { ShoppingCartResult } from './ShoppingCartResult.js';

export interface ReturnResponse {
  returnPaymentResponse?: RefundPaymentResponse;
  shoppingCart?: ShoppingCartResult;
  fundSplit?: FundSplit;
}
