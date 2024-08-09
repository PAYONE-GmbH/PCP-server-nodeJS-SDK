/** @description Object containing additional non PCI DSS relevant card information. used instead of card (missing fields: cardNumber, expiryDate, cvv)    */
export interface CardInfo {
  /** @description The card holder's name on the card. */
  cardholderName?: string;
}
