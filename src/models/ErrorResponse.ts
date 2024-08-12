import type { APIError } from './APIError.js';

export interface ErrorResponse {
  /** @description Unique reference of this error response for debugging purposes */
  errorId?: string;
  errors?: APIError[];
}
