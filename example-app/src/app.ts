import { fileURLToPath } from 'node:url';

import cors from 'cors';
import express from 'express';
import type { CommunicatorConfiguration } from 'pcp-server-nodejs-sdk';
import { errorHandler, notFound } from './middleware/error-handler.js';
import { requestLogger } from './middleware/request-logger.js';
import { createApiRouter } from './routes/index.js';
import { createSdkClients } from './sdk.js';

export interface AppOptions {
  configuration: CommunicatorConfiguration;
  merchantId: string;
  corsOrigin?: string;
  uiDefaults?: { commerceCaseId?: string; checkoutId?: string };
}

export function createApp({
  configuration,
  merchantId,
  corsOrigin = '*',
  uiDefaults = {},
}: AppOptions) {
  const app = express();
  app.disable('x-powered-by');
  app.use(requestLogger);
  app.use((_request, response, next) => {
    response.set('Cache-Control', 'no-store');
    next();
  });
  app.use(
    cors({
      origin: corsOrigin,
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'X-Request-ID'],
      exposedHeaders: ['X-Request-ID'],
    }),
  );
  app.get('/health', (_request, response) => response.json({ status: 'ok' }));
  app.get('/ui/config', (_request, response) => response.json({ merchantId, ...uiDefaults }));
  app.use('/api', createApiRouter({ clients: createSdkClients(configuration), merchantId }));
  app.use(
    express.static(fileURLToPath(new URL('../public/', import.meta.url)), {
      etag: false,
      lastModified: false,
      setHeaders: (response) => {
        response.setHeader('Cache-Control', 'no-store');
        response.setHeader('X-Content-Type-Options', 'nosniff');
      },
    }),
  );
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
