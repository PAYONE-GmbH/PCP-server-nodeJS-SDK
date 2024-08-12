import { describe, test, expect } from 'vitest';
import { ApiException } from './ApiException.js';

describe('ApiException', () => {
  test('constructor', () => {
    const apiException = new ApiException(404, 'Body');
    expect(apiException).toBeDefined();
  });

  test('constructor with cause', () => {
    const apiException = new ApiException(404, 'Body', new Error('Cause'));
    expect(apiException.stack).toContain('Error: Cause');
  });

  test('getters', () => {
    const apiException = new ApiException(404, 'Body');
    expect(apiException.getResponseBody()).toEqual('Body');
    expect(apiException.getStatusCode()).toEqual(404);
  });
});
