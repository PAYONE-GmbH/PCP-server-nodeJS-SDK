import { Response } from 'node-fetch';

export const createResponseMock = <T>(statusCode: number, body?: T) => {
  const usedBody = body ? JSON.stringify(body) : undefined;
  return new Response(usedBody, {
    status: statusCode,
  });
};

export const createApiErrorResponseExceptionMock = (statusCode: number, body: string) => {
  const usedBody = body ? JSON.stringify(body) : undefined;
  return new Response(usedBody, {
    status: statusCode,
  });
};
