import { APIError } from '../models/APIError';
import { ApiException } from './ApiException';

export class ApiErrorResponseException extends ApiException {
  private readonly errors: APIError[];

  constructor(statusCode: number, responseBody: string, errors: APIError[] = [], cause?: Error) {
    super(statusCode, responseBody, cause);
    this.errors = errors.length ? errors : [];
  }

  public getErrors(): APIError[] {
    return this.errors;
  }
}
