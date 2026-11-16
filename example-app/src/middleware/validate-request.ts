import { json, type RequestHandler, type Response } from 'express';
import { HttpError } from './error-handler.js';

export const validateIds: RequestHandler = (request, _response, next) => {
  for (const value of Object.values(request.params)) {
    if (typeof value !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(value)) {
      return next(new HttpError(400, 'Invalid resource ID'));
    }
  }
  next();
};

const requireJson: RequestHandler = (request, _response, next) => {
  const hasBody =
    request.headers['transfer-encoding'] !== undefined ||
    Number(request.headers['content-length'] ?? 0) > 0;
  if (hasBody && !request.is('application/json')) {
    return next(new HttpError(415, 'Use Content-Type: application/json'));
  }
  next();
};

const parseJson = json({
  limit: '1mb',
  strict: false,
  verify: (_request, response, buffer) => {
    // Keep the raw body only until it has been sanitized by the logger.
    (response as Response).locals.rawBody = buffer.toString('utf8');
  },
});

const requireObject: RequestHandler = (request, _response, next) => {
  if (request.body === undefined) request.body = {};
  if (request.body === null || typeof request.body !== 'object' || Array.isArray(request.body)) {
    return next(new HttpError(400, 'JSON body must be an object'));
  }
  next();
};

export const jsonBody = [requireJson, parseJson, requireObject];
