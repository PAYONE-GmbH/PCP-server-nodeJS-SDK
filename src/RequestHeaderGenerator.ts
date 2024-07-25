import * as crypto from 'crypto';
import { Headers, RequestInit } from 'node-fetch';
import { CommunicatorConfiguration } from './CommunicatorConfiguration';
import { ServerMetaInfo } from './utils/ServerMetaInfo';

export class RequestHeaderGenerator {
  public static readonly SERVER_META_INFO_HEADER_NAME = 'X-GCS-ServerMetaInfo';
  public static readonly CLIENT_META_INFO_HEADER_NAME = 'X-GCS-ClientMetaInfo';
  private static readonly ALGORITHM = 'HmacSHA256';
  private static readonly WHITESPACE_REGEX = /\r?\n[h]*/g;
  private readonly DATE_HEADER_NAME = 'Date';
  private readonly AUTHORIZATION_HEADER_NAME = 'Authorization';

  private readonly config: CommunicatorConfiguration;
  private readonly hmac: crypto.Hmac;

  constructor(config: CommunicatorConfiguration) {
    this.config = config;
    this.hmac = crypto.createHmac(RequestHeaderGenerator.ALGORITHM, config.getApiSecret());
  }

  public generateAdditionalRequestHeaders(url: string, request: RequestInit): RequestInit {
    const headers = new Headers(request.headers);

    if (!headers.has(this.DATE_HEADER_NAME)) {
      headers.set(this.DATE_HEADER_NAME, new Date().toUTCString());
    }
    if (!headers.has(RequestHeaderGenerator.SERVER_META_INFO_HEADER_NAME)) {
      headers.set(RequestHeaderGenerator.SERVER_META_INFO_HEADER_NAME, this.getServerMetaInfo());
    }
    if (!headers.has(RequestHeaderGenerator.CLIENT_META_INFO_HEADER_NAME)) {
      headers.set(RequestHeaderGenerator.CLIENT_META_INFO_HEADER_NAME, this.getClientMetaInfo());
    }
    if (!headers.has(this.AUTHORIZATION_HEADER_NAME)) {
      headers.set(this.AUTHORIZATION_HEADER_NAME, this.getAuthHeader(url, request, headers));
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
    if (headers.has('Content-Type')) {
      stringToSign += `${headers.get('Content-Type')}\n`;
    }
    stringToSign += '\n';
    // 3. Date
    stringToSign += `${headers.get(this.DATE_HEADER_NAME)}\n`;
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
    const hash = this.hmac.update(target).digest();
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
