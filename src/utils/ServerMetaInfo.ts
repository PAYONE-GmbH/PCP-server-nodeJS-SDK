import * as os from 'os';

export class ServerMetaInfo {
  public platformIdentifier: string;
  public sdkIdentifier: string;
  public sdkCreator: string;
  public integrator: string;

  constructor(integrator?: string) {
    this.platformIdentifier = `${os.platform()}, node version is: ${process.version}`;
    this.sdkIdentifier = 'NodeServerSDK/v1.4.0'; // version gets updated automatically after calling npm version <major|minor|patch>
    this.sdkCreator = 'PAYONE GmbH';
    this.integrator = integrator || '';
  }
}
