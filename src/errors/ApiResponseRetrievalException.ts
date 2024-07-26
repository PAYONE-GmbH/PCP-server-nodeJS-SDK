import { ApiException } from './ApiException.js';

export class ApiResponseRetrievalException extends ApiException {
  constructor(statusCode: number, responseBody: string, cause?: Error) {
    super(statusCode, responseBody, cause);
  }
}
