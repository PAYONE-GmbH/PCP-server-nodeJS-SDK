/**
 * @description Network/Scheme of the card used for the payment.
 * @example MASTERCARD
 */
export enum MobilePaymentNetwork {
  MASTERCARD = 'MASTERCARD',
  VISA = 'VISA',
  AMEX = 'AMEX',
  GIROCARD = 'GIROCARD',
  /** @description Not supported yet */
  DISCOVER = 'DISCOVER',
  /** @description Not supported yet */
  JCB = 'JCB',
}
