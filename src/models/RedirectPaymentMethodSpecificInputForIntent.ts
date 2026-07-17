import type { PaymentProductId } from './PaymentProductId.js';
import type { RedirectionData } from './RedirectionData.js';
import type { RedirectPaymentProduct840SpecificInputData } from './RedirectPaymentProduct840SpecificInputData.js';
import type { RequiresApproval } from './RequiresApproval.js';

/** @description Input details for payment intents that redirect to PayPal. */
export interface RedirectPaymentMethodSpecificInputForIntent {
  requiresApproval?: RequiresApproval;
  paymentProductId?: PaymentProductId;
  paymentProduct840SpecificInput?: RedirectPaymentProduct840SpecificInputData;
  redirectionData?: RedirectionData;
}
