import type { AuthorizationMode } from './AuthorizationMode.js';
import type { MerchantName } from './MerchantName.js';
import type { MerchantOrigin } from './MerchantOrigin.js';
import type { PaymentMethodId } from './PaymentMethodId.js';

/** @description Object containing the specific input details for generating a pay-link. */
export interface PaymentLinkSpecificInput {
  expirationDate?: string;
  authorizationMode: AuthorizationMode;
  paymentMethods: PaymentMethodId[];
  bnplId?: string;
  returnUrl?: string;
  logoUrl?: string;
  autoRedirection?: boolean;
  termsUrl?: string;
  retryNumber?: number;
  merchantName?: MerchantName;
  merchantOrigin?: MerchantOrigin;
}
