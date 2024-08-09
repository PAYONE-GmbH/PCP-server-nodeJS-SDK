import type { APIError } from './APIError.js';

export interface RefundErrorResponse {
  /** @description Unique reference, for debugging purposes, of this error response */
  errorId?: string;
  errors?: APIError[];
}
