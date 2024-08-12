import { expect, describe, test } from 'vitest';
import { RequestHeaderGenerator } from './RequestHeaderGenerator.js';
import { CommunicatorConfiguration } from './CommunicatorConfiguration.js';
import { Headers, type RequestInit } from 'node-fetch';
import { ServerMetaInfo } from './utils/ServerMetaInfo.js';

describe('RequestHeaderGenerator', () => {
  const TEST_API_KEY = 'KEY';
  const TEST_API_SECRET = 'Super duper Ethan Hunt level secret';
  const TEST_HOST = 'awesome-api.com';
  const communicatorConfiguration = new CommunicatorConfiguration(TEST_API_KEY, TEST_API_SECRET, TEST_HOST);
  test('constructs', () => {
    const requestHeaderGenerator = new RequestHeaderGenerator(communicatorConfiguration);
    expect(requestHeaderGenerator).toBeDefined();
  });
  test('testSignatureGenerationForGet', () => {
    const requestHeaderGenerator = new RequestHeaderGenerator(communicatorConfiguration);
    const date = new Date(1720520499000);
    const headers = new Headers();
    headers.set(RequestHeaderGenerator.DATE_HEADER_NAME, date.toUTCString());
    headers.set(RequestHeaderGenerator.SERVER_META_INFO_HEADER_NAME, 'server fixed');
    headers.set(RequestHeaderGenerator.CLIENT_META_INFO_HEADER_NAME, 'client fixed');
    const request: RequestInit = {
      method: 'GET',
      headers,
    };
    const updatedRequest = requestHeaderGenerator.generateAdditionalRequestHeaders(
      'http://awesome-api.com/v1/commerce_cases',
      request,
    );
    const updatedHeaders: Headers = new Headers(updatedRequest.headers!);
    const authHeader = updatedHeaders.get(RequestHeaderGenerator.AUTHORIZATION_HEADER_NAME);
    expect(authHeader).toEqual('GCS v1HMAC:KEY:ZSq7H19dyhyNGSPY5UgyPwITc5n4QG+zHnNDExIa6A8=');
  });

  test('testSignatureGenerationWithContentType', () => {
    const requestHeaderGenerator = new RequestHeaderGenerator(communicatorConfiguration);
    const date = new Date(1720520499000);
    const headers = new Headers();
    headers.set(RequestHeaderGenerator.CONTENT_TYPE_HEADER_NAME, 'application/json; charset=utf-8');
    headers.set(RequestHeaderGenerator.DATE_HEADER_NAME, date.toUTCString());
    headers.set(RequestHeaderGenerator.SERVER_META_INFO_HEADER_NAME, 'server fixed');
    headers.set(RequestHeaderGenerator.CLIENT_META_INFO_HEADER_NAME, 'client fixed');
    const request: RequestInit = {
      method: 'POST',
      headers,
    };
    const updatedRequest = requestHeaderGenerator.generateAdditionalRequestHeaders(
      'http://awesome-api.com/v1/commerce_cases',
      request,
    );
    const updatedHeaders: Headers = new Headers(updatedRequest.headers!);
    const authHeader = updatedHeaders.get(RequestHeaderGenerator.AUTHORIZATION_HEADER_NAME);
    expect(authHeader).toEqual('GCS v1HMAC:KEY:c5aNDw4AUxRChugRyN0OmTCs38YLA9E/tR+k0bOQzyk=');
  });

  test('addADateHeaderIfMissingTest', () => {
    const requestHeaderGenerator = new RequestHeaderGenerator(communicatorConfiguration);
    const headers = new Headers();
    const request: RequestInit = {
      method: 'GET',
      headers,
    };
    const updatedRequest = requestHeaderGenerator.generateAdditionalRequestHeaders(
      'http://awesome-api.com/v1/commerce_cases',
      request,
    );
    const updatedHeaders: Headers = new Headers(updatedRequest.headers!);
    const dateHeader = updatedHeaders.get(RequestHeaderGenerator.DATE_HEADER_NAME);
    expect(dateHeader).not.toBeNull();
    expect(dateHeader).not.toBe('');
  });

  test('addServerMetaInfoIfMissingTest', () => {
    const requestHeaderGenerator = new RequestHeaderGenerator(communicatorConfiguration);
    const headers = new Headers();
    const request: RequestInit = {
      method: 'GET',
      headers,
    };
    const updatedRequest = requestHeaderGenerator.generateAdditionalRequestHeaders(
      'http://awesome-api.com/v1/commerce_cases',
      request,
    );
    const updatedHeaders: Headers = new Headers(updatedRequest.headers!);
    const serverMetaInfoHeaderBase64 = updatedHeaders.get(RequestHeaderGenerator.SERVER_META_INFO_HEADER_NAME);
    const meta = new ServerMetaInfo();
    const jsonString = JSON.stringify(meta);
    const expectedAsBase64 = Buffer.from(jsonString, 'utf-8').toString('base64');
    expect(serverMetaInfoHeaderBase64).toEqual(expectedAsBase64);
  });

  test('addServerClientInfoIfMissingTest', () => {
    const requestHeaderGenerator = new RequestHeaderGenerator(communicatorConfiguration);
    const headers = new Headers();
    const request: RequestInit = {
      method: 'GET',
      headers,
    };
    const updatedRequest = requestHeaderGenerator.generateAdditionalRequestHeaders(
      'http://awesome-api.com/v1/commerce_cases',
      request,
    );
    const updatedHeaders: Headers = new Headers(updatedRequest.headers!);
    const clientMetaInfoHeaderBase64 = updatedHeaders.get(RequestHeaderGenerator.CLIENT_META_INFO_HEADER_NAME);
    const jsonString = JSON.stringify('[]');
    const expectedAsBase64 = Buffer.from(jsonString, 'utf-8').toString('base64');
    expect(clientMetaInfoHeaderBase64).toEqual(expectedAsBase64);
  });
});
