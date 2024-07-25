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

  public equals(other: ServerMetaInfo): boolean {
    if (this === other) {
      return true;
    }
    if (!other || this.constructor !== other.constructor) {
      return false;
    }
    const that: ServerMetaInfo = other as ServerMetaInfo;
    return (
      this.platformIdentifier === that.platformIdentifier &&
      this.sdkIdentifier === that.sdkIdentifier &&
      this.sdkCreator === that.sdkCreator
    );
  }

  public hashCode(): number {
    let hash = 0;
    const str = `${this.platformIdentifier}${this.sdkIdentifier}${this.sdkCreator}`;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
}
