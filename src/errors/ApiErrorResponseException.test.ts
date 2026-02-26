import { describe, expect, test } from 'vitest';
import type { APIError } from '../models/APIError.js';
import { ApiErrorResponseException } from './ApiErrorResponseException.js';

describe('ApiErrorResponseException', () => {
  test('constructor', () => {
    const apiException = new ApiErrorResponseException(404, 'Body');
    expect(apiException).toBeDefined();
  });

  test('constructor with Errors', () => {
    const apiError: APIError = {
      errorCode: 'errorCode',
    };
    const apiException = new ApiErrorResponseException(404, 'Body', [apiError]);
    expect(apiException.getErrors()).toContain(apiError);
  });
});
