import { CommunicatorConfiguration } from 'pcp-server-nodejs-sdk';
import { createTestServer } from './server.js';

const run = () => {
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_SECRET;
  const merchantId = process.env.MERCHANT_ID;
  if (!apiKey || !apiSecret || !merchantId) {
    console.error('Please provide API_KEY, API_SECRET, and MERCHANT_ID as environment variables');
    process.exit(1);
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(merchantId)) {
    throw new Error('MERCHANT_ID must contain only letters, numbers, underscores and hyphens');
  }
  const port = Number(process.env.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }
  const host = process.env.HOST ?? '0.0.0.0';
  const communicatorConfiguration = new CommunicatorConfiguration(
    apiKey,
    apiSecret,
    process.env.API_HOST ?? 'https://api.preprod.commerce.payone.com',
  );

  const server = createTestServer(
    communicatorConfiguration,
    merchantId,
    process.env.CORS_ORIGIN ?? '*',
    {
      commerceCaseId: process.env.COMMERCE_CASE_ID,
      checkoutId: process.env.CHECKOUT_ID,
    },
  );
  server.on('error', (error) => {
    console.error('Test backend failed:', error.message);
    process.exitCode = 1;
  });
  server.listen(port, host, () => {
    console.log(`Test backend listening on ${host}:${port}`);
    console.log(`UI: http://localhost:${port}/`);
    console.log(`Routes: http://localhost:${port}/api`);
  });
  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.once(signal, () => server.close());
  }
};

run();
