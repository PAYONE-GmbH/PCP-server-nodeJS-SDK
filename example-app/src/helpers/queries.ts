import { GetCheckoutsQuery, GetCommerceCasesQuery } from 'pcp-server-nodejs-sdk';

// The example forwards PAYONE's single-valued HTTP filters without changing them.
// Subclassing keeps the adapter compatible with the SDK's concrete query types.
export class CommerceCasesQuery extends GetCommerceCasesQuery {
  constructor(private readonly searchParams: URLSearchParams) {
    super();
  }

  override toQueryMap(): Map<string, string> {
    return new Map(this.searchParams);
  }
}

export class CheckoutsQuery extends GetCheckoutsQuery {
  constructor(private readonly searchParams: URLSearchParams) {
    super();
  }

  override toQueryMap(): Map<string, string> {
    return new Map(this.searchParams);
  }
}

export function searchParams(originalUrl: string): URLSearchParams {
  return new URL(originalUrl, 'http://localhost').searchParams;
}
