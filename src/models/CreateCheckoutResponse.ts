import type { AllowedPaymentActions } from './AllowedPaymentActions.js';
import type { AmountOfMoney } from './AmountOfMoney.js';
import type { CheckoutReferences } from './CheckoutReferences.js';
import type { CreatePaymentResponse } from './CreatePaymentResponse.js';
import type { CreationDateTime } from './CreationDateTime.js';
import type { ErrorResponse } from './ErrorResponse.js';
import type { PaymentExecution } from './PaymentExecution.js';
import type { Shipping } from './Shipping.js';
import type { ShoppingCartResult } from './ShoppingCartResult.js';
import type { StatusCheckout } from './StatusCheckout.js';
import type { StatusOutput } from './StatusOutput.js';

/** @description Object containing the reference of the Checkout for following requests. */
export interface CreateCheckoutResponse {
  /**
   * Format: UUID
   * @description Reference to the Checkout. Can be used for following requests to get and update the Checkout and execute the
   *     payment.
   * @example 707ef15b-7a0a-48f2-b7d8-c95103418a9c
   */
  checkoutId?: string;
  shoppingCart?: ShoppingCartResult;
  paymentResponse?: CreatePaymentResponse;
  errorResponse?: ErrorResponse;
  amountOfMoney?: AmountOfMoney;
  references?: CheckoutReferences;
  shipping?: Shipping;
  paymentExecution?: PaymentExecution;
  checkoutStatus?: StatusCheckout;
  statusOutput?: StatusOutput;
  creationDateTime?: CreationDateTime;
  allowedPaymentActions?: AllowedPaymentActions[];
}
