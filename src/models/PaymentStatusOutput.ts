import type { StatusCategoryValue } from './StatusCategoryValue.js';

/**
 * @description This object has the numeric representation of the current payment status, timestamp of last status change and
 *     performable action on the current payment resource. In case of failed payments and negative scenarios, detailed
 *     error information is listed.
 */
export interface PaymentStatusOutput {
  /** @description Flag indicating if the payment can be cancelled */
  isCancellable?: boolean;
  statusCategory?: StatusCategoryValue;
  /** @description Indicates if the transaction has been authorized */
  isAuthorized?: boolean;
  /** @description Flag indicating if the payment can be refunded */
  isRefundable?: boolean;
}
