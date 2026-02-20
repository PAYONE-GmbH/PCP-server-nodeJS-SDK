import type { CapturePaymentResponse } from './CapturePaymentResponse.js';
import type { FundSplit } from './FundSplit.js';
import type { ShoppingCartResult } from './ShoppingCartResult.js';

export interface DeliverResponse {
  capturePaymentResponse?: CapturePaymentResponse;
  shoppingCart?: ShoppingCartResult;
  fundSplit?: FundSplit;
}
