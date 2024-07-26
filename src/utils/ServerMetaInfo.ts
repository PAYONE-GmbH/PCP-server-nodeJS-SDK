import * as os from 'os';

export class ServerMetaInfo {
  public platformIdentifier: string;
  public sdkIdentifier: string;
  public sdkCreator: string;

  constructor() {
    this.platformIdentifier = `${os.platform()}, node version is: ${process.version}`;
    this.sdkIdentifier = 'JavaServerSDK/v0.0.2'; // version gets updated with the prepare-release.sh script
    this.sdkCreator = 'PAYONE GmbH';

    // TODO: what about integrator?
  }
}
