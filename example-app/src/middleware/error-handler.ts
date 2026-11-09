import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ApiException } from 'pcp-server-nodejs-sdk';

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export const notFound: RequestHandler = (_request, _response, next) => {
  next(new HttpError(404, 'Route not found'));
};

export const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
  if (response.headersSent) return next(error);
  if (error instanceof HttpError) {
    response.status(error.status).json({ message: error.message });
    return;
  }
  if (error?.type === 'entity.too.large') {
    response.status(413).json({ message: 'JSON body exceeds 1 MiB' });
    return;
  }
  if (error?.type === 'entity.parse.failed') {
    response.status(400).json({ message: 'Invalid JSON body' });
    return;
  }
  if (error instanceof URIError) {
    response.status(400).json({ message: 'Invalid path encoding' });
    return;
  }
  if (error instanceof ApiException) {
    const status = error.getStatusCode();
    let body: unknown;
    try {
      body = JSON.parse(error.getResponseBody());
    } catch {
      body = { message: 'PAYONE returned a non-JSON response' };
    }
    response.status(status >= 400 && status <= 599 ? status : 502).json(body);
    return;
  }
  response.status(502).json({ message: 'PAYONE request failed' });
};
