import { expect, describe, test } from 'vitest';
import { ServerMetaInfo } from './ServerMetaInfo.js';
import * as os from 'os';

describe('ServerMetaInfo', () => {
  test('constructs', () => {
    const serverMetaInfo = new ServerMetaInfo();
    expect(serverMetaInfo).toBeDefined();
  });
  test('initializes with correct values', () => {
    const serverMetaInfo = new ServerMetaInfo();
    expect(serverMetaInfo.platformIdentifier).toBe(`${os.platform()}, node version is: ${process.version}`);
    expect(serverMetaInfo.sdkIdentifier).toBe('NodeServerSDK/v1.2.0');
    expect(serverMetaInfo.sdkCreator).toBe('PAYONE GmbH');
  });
});
