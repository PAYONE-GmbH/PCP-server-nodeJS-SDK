import type { MerchantAction } from './MerchantAction.js';
import type { PaymentCreationOutput } from './PaymentCreationOutput.js';
import type { PaymentResponse } from './PaymentResponse.js';

/** @description Object containing details on the created payment it has directly be executed. */
export interface CreatePaymentResponse {
  creationOutput?: PaymentCreationOutput;
  merchantAction?: MerchantAction;
  payment?: PaymentResponse;
  /**
   * Format: UUID
   * @description reference to the paymentExecution.
   * @example 4f0c512e-f12c-11ec-8ea0-0242ac120002
   */
  paymentExecutionId?: string;
}
