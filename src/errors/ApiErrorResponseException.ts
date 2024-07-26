import { APIError } from '../models/APIError.js';
import { ApiException } from './ApiException.js';

export class ApiErrorResponseException extends ApiException {
  private readonly errors: APIError[];

  constructor(statusCode: number, responseBody: string, errors: APIError[] = []) {
    super(statusCode, responseBody);
    this.errors = errors.length ? errors : [];
  }

  public getErrors(): APIError[] {
    return this.errors;
  }
}
