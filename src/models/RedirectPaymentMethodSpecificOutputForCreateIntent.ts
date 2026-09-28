import type { PaymentProductId } from './PaymentProductId.js';
import type { RedirectData } from './RedirectData.js';
import type { RedirectPaymentProduct840SpecificInputData } from './RedirectPaymentProduct840SpecificInputData.js';
import type { RequiresApproval } from './RequiresApproval.js';

/** @description Redirect payment product details for a created payment intent. */
export interface RedirectPaymentMethodSpecificOutputForCreateIntent {
  requiresApproval?: RequiresApproval;
  paymentProductId?: PaymentProductId;
  paymentProduct840SpecificOutput?: RedirectPaymentProduct840SpecificInputData;
  redirectData?: RedirectData;
}
