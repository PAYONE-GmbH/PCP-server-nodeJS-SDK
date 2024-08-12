import { describe, expect, test } from 'vitest';
import { ApiResponseRetrievalException } from './ApiResponseRetrievalException.js';

describe('ApiResponseRetrievalException', () => {
  test('constructor', () => {
    const apiException = new ApiResponseRetrievalException(404, 'Body');
    expect(apiException).toBeDefined();
  });

  test('constructor with cause', () => {
    const apiException = new ApiResponseRetrievalException(404, 'Body', new Error('Cause'));
    expect(apiException.stack).toContain('Error: Cause');
  });
});
