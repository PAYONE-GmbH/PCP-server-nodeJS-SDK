import { Response } from 'node-fetch';

export const createResponseMock = <T>(statusCode: number, body?: T) => {
  const usedBody = body ? JSON.stringify(body) : undefined;
  return new Response(usedBody, {
    status: statusCode,
  });
};

export const createEmptyErrorResponseMock = (statusCode: number = 500, body: string | undefined = undefined) => {
  const usedBody = body ? JSON.stringify(body) : undefined;
  return new Response(usedBody, {
    status: statusCode,
  });
};
