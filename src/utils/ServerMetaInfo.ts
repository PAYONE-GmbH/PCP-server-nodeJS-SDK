import * as os from 'os';

export class ServerMetaInfo {
  public platformIdentifier: string;
  public sdkIdentifier: string;
  public sdkCreator: string;
  public integrator: string;

  constructor(integrator?: string) {
    this.platformIdentifier = `${os.platform()}, node version is: ${process.version}`;
    this.sdkIdentifier = 'NodeServerSDK/v0.0.3'; // version gets updated with the prepare-release.sh script
    this.sdkCreator = 'PAYONE GmbH';
    this.integrator = integrator || '';
  }
}
