/**
 * @description Result of the Address Verification Service checks.
 * Possible values are:
 *  * A - Address (Street) matches, Zip does not
 *  * B - Street address match for international transactions—Postal code not verified due to incompatible formats
 *  * C - Street address and postal code not verified for international transaction due to incompatible formats
 *  * D - Street address and postal code match for international transaction, cardholder name is incorrect
 *  * E - AVS error
 *  * F - Address does match and five digit ZIP code does match (UK only)
 *  * G - Address information is unavailable; international transaction; non-AVS participant
 *  * H - Billing address and postal code match, cardholder name is incorrect (Amex)
 *  * I - Address information not verified for international transaction
 *  * K - Cardholder name matches (Amex)
 *  * L - Cardholder name and postal code match (Amex)
 *  * M - Cardholder name, street address, and postal code match for international transaction
 *  * N - No Match on Address (Street) or Zip
 *  * O - Cardholder name and address match (Amex)
 *  * P - Postal codes match for international transaction—Street address not verified due to incompatible formats
 *  * Q - Billing address matches, cardholder is incorrect (Amex)
 *  * R - Retry, System unavailable or Timed out
 *  * S - Service not supported by issuer
 *  * U - Address information is unavailable
 *  * W - 9 digit Zip matches, Address (Street) does not
 *  * X - Exact AVS Match
 *  * Y - Address (Street) and 5 digit Zip match
 *  * Z - 5 digit Zip matches, Address (Street) does not
 *  * 0 - No service available
 * @example A
 */
export enum AvsResult {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I',
  K = 'K',
  L = 'L',
  M = 'M',
  N = 'N',
  O = 'O',
  P = 'P',
  Q = 'Q',
  R = 'R',
  S = 'S',
  U = 'U',
  W = 'W',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
  NO_SERVICE = '0',
}
