import type { RedirectionData } from './RedirectionData.js';

/**
 * @description Object containing specific data regarding 3-D Secure for card digital wallets.
 * Necessary to perform 3D Secure when there is no liability shift from the wallet and corresponding card network.
 */
export interface MobilePaymentThreeDSecure {
  /**
   * @description Data required for redirection during 3-D Secure authentication.
   */
  redirectionData?: RedirectionData;
}
