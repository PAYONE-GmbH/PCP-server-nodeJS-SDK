export class ApiException extends Error {
  private readonly statusCode: number;
  private readonly responseBody: string;

  constructor(statusCode: number, responseBody: string, cause?: Error) {
    super(responseBody);
    this.statusCode = statusCode;
    this.responseBody = responseBody;
    if (cause) {
      this.stack = cause.stack;
    }
  }

  public getStatusCode(): number {
    return this.statusCode;
  }

  public getResponseBody(): string {
    return this.responseBody;
  }
}
