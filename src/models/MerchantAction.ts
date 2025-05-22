import type { ActionType } from './ActionType.js';
import type { RedirectData } from './RedirectData.js';

/**
 * @description Object that contains the action, including the needed data, that you should perform next, like showing
 *     instructions, showing the transaction results or redirect to a third party to complete the payment
 */
export interface MerchantAction {
  actionType?: ActionType;
  redirectData?: RedirectData;
}
