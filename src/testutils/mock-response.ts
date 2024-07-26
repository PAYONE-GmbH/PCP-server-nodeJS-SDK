import { Response } from 'node-fetch';

export const createResponseMock = <T>(statusCode: number, body?: T) => {
  const usedBody = body ? JSON.stringify(body) : undefined;
  return new Response(usedBody, {
    status: statusCode,
  });
};
