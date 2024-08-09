import type { PaymentProduct3391SpecificInput } from './PaymentProduct3391SpecificInput.js';

/** @description To complete the Order the completePaymentMethodSpecificInput has to be provided, containing the selected installmentOptionId as well as the the bankAccountInformation of the customer.  */
export interface CompletePaymentMethodSpecificInput {
  paymentProduct3391SpecificInput?: PaymentProduct3391SpecificInput;
}
