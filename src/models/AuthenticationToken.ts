/**
 * Model for the authentication JWT token response.
 */
export interface AuthenticationToken {
  /** JWT token string */
  token: string;
  /** UUID for the token */
  id: string;
  /** Creation date/time (ISO 8601) */
  creationDate: string;
  /** Expiration date/time (ISO 8601) */
  expirationDate: string;
}
