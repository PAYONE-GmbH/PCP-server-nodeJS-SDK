import type { CancelPaymentResponse } from './CancelPaymentResponse.js';
import type { ShoppingCartResult } from './ShoppingCartResult.js';

export interface CancelResponse {
  cancelPaymentResponse?: CancelPaymentResponse;
  shoppingCart?: ShoppingCartResult;
}
