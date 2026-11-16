import { CommunicatorConfiguration } from 'pcp-server-nodejs-sdk';
import { createApp } from './app.js';
import { loadConfig } from './config.js';

try {
  const config = loadConfig();
  const app = createApp({
    configuration: new CommunicatorConfiguration(config.apiKey, config.apiSecret, config.apiHost),
    merchantId: config.merchantId,
    corsOrigin: config.corsOrigin,
    uiDefaults: config.uiDefaults,
  });
  const server = app.listen(config.port, config.host, () => {
    console.log(`Test backend listening on ${config.host}:${config.port}`);
    console.log(`UI: http://localhost:${config.port}/`);
    console.log(`Routes: http://localhost:${config.port}/api`);
  });
  server.on('error', (error) => {
    console.error('Test backend failed:', error.message);
    process.exitCode = 1;
  });
  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.once(signal, () => server.close());
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
