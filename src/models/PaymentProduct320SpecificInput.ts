import type { ApplePaymentDataTokenInformation } from './ApplePaymentDataTokenInformation.js';
import type { Network } from './Network.js';

/** @description Object containing additional Information needed for Apple Pay payment transactions. */
export interface PaymentProduct320SpecificInput {
  network?: Network;
  token?: ApplePaymentDataTokenInformation;
}
