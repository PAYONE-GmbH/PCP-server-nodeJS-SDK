import type { CapturePaymentResponse } from './CapturePaymentResponse.js';
import type { ShoppingCartResult } from './ShoppingCartResult.js';

export interface DeliverResponse {
  capturePaymentResponse?: CapturePaymentResponse;
  shoppingCart?: ShoppingCartResult;
}
