import type { MerchantAction } from './MerchantAction.js';
import type { PaymentCreationOutput } from './PaymentCreationOutput.js';
import type { PaymentResponse } from './PaymentResponse.js';

export interface CompletePaymentResponse {
  creationOutput?: PaymentCreationOutput;
  merchantAction?: MerchantAction;
  payment?: PaymentResponse;
}
