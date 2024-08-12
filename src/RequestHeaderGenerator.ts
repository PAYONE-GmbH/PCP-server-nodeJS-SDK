import * as crypto from 'crypto';
import { Headers, type RequestInit } from 'node-fetch';
import { URL } from 'url';

import { CommunicatorConfiguration } from './CommunicatorConfiguration.js';
import { ServerMetaInfo } from './utils/ServerMetaInfo.js';

export class RequestHeaderGenerator {
  public static readonly SERVER_META_INFO_HEADER_NAME = 'X-GCS-ServerMetaInfo';
  public static readonly CLIENT_META_INFO_HEADER_NAME = 'X-GCS-ClientMetaInfo';
  private static readonly ALGORITHM = 'sha256';
  private static readonly WHITESPACE_REGEX = /\r?\n[h]*/g;
  private static readonly DATE_HEADER_NAME = 'Date';
  private static readonly AUTHORIZATION_HEADER_NAME = 'Authorization';
  private static readonly CONTENT_TYPE_HEADER_NAME = 'Content-Type';

  private readonly config: CommunicatorConfiguration;

  constructor(config: CommunicatorConfiguration) {
    this.config = config;
  }

  public generateAdditionalRequestHeaders(url: string, request: RequestInit): RequestInit {
    const headers = new Headers(request.headers);

    if (!headers.has(RequestHeaderGenerator.DATE_HEADER_NAME)) {
      headers.set(RequestHeaderGenerator.DATE_HEADER_NAME, new Date().toUTCString());
    }
    if (!headers.has(RequestHeaderGenerator.SERVER_META_INFO_HEADER_NAME)) {
      headers.set(RequestHeaderGenerator.SERVER_META_INFO_HEADER_NAME, this.getServerMetaInfo());
    }
    if (!headers.has(RequestHeaderGenerator.CLIENT_META_INFO_HEADER_NAME)) {
      headers.set(RequestHeaderGenerator.CLIENT_META_INFO_HEADER_NAME, this.getClientMetaInfo());
    }
    if (!headers.has(RequestHeaderGenerator.AUTHORIZATION_HEADER_NAME)) {
      headers.set(RequestHeaderGenerator.AUTHORIZATION_HEADER_NAME, this.getAuthHeader(url, request, headers));
    }

    return {
      ...request,
      headers,
    };
  }

  private getAuthHeader(url: string, request: RequestInit, headers: Headers): string {
    // 1. method
    let stringToSign = `${request.method}\n`;
    // 2. Content-Type
    if (headers.has(RequestHeaderGenerator.CONTENT_TYPE_HEADER_NAME)) {
      stringToSign += `${headers.get(RequestHeaderGenerator.CONTENT_TYPE_HEADER_NAME)}`;
    }
    stringToSign += '\n';
    // 3. Date
    stringToSign += `${headers.get(RequestHeaderGenerator.DATE_HEADER_NAME)}\n`;
    // 4. Canonicalized Headers (starting with X-GCS, sorted by names)
    if (headers.has(RequestHeaderGenerator.CLIENT_META_INFO_HEADER_NAME)) {
      stringToSign += `${RequestHeaderGenerator.CLIENT_META_INFO_HEADER_NAME.toLowerCase()}:${headers.get(RequestHeaderGenerator.CLIENT_META_INFO_HEADER_NAME)!.replace(RequestHeaderGenerator.WHITESPACE_REGEX, ' ').trim()}\n`;
    }
    if (headers.has(RequestHeaderGenerator.SERVER_META_INFO_HEADER_NAME)) {
      stringToSign += `${RequestHeaderGenerator.SERVER_META_INFO_HEADER_NAME.toLowerCase()}:${headers.get(RequestHeaderGenerator.SERVER_META_INFO_HEADER_NAME)!.replace(RequestHeaderGenerator.WHITESPACE_REGEX, ' ').trim()}\n`;
    }
    // 5. Canonicalized Resource (has to include query parameters)
    const urlInternal = new URL(url);
    stringToSign += urlInternal.pathname;
    if (urlInternal.search) {
      stringToSign += `${urlInternal.search}`;
    }
    stringToSign += '\n';
    const signature = this.sign(stringToSign);
    return `GCS v1HMAC:${this.config.getApiKey()}:${signature}`;
  }

  private sign(target: string): string {
    const hmac = crypto.createHmac(RequestHeaderGenerator.ALGORITHM, this.config.getApiSecret());
    const hash = hmac.update(target).digest();
    return hash.toString('base64');
  }

  private getServerMetaInfo(): string {
    const meta = new ServerMetaInfo();
    const jsonString = JSON.stringify(meta);
    return Buffer.from(jsonString, 'utf-8').toString('base64');
  }

  private getClientMetaInfo(): string {
    const encodedBytes = Buffer.from('"[]"', 'utf-8').toString('base64');
    return encodedBytes;
  }
}
