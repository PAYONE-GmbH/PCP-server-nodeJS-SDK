import { CommunicatorConfiguration } from 'pcp-server-nodejs-sdk';
import { CommerceCaseApiExample } from './examples/CommerceCaseApiExample';

const run = async () => {
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_SECRET;
  const merchantId = process.env.MERCHANT_ID;
  const commerceCaseId = process.env.COMMERCE_CASE_ID;
  const checkoutId = process.env.CHECKOUT_ID;
  if (!apiKey || !apiSecret || !merchantId || !commerceCaseId || !checkoutId) {
    console.error(
      'Please provide API_KEY, API_SECRET, MERCHANT_ID, COMMERCE_CASE_ID and CHECKOUT_ID as environment variables',
    );
    process.exit(1);
  }

  const communicatorConfiguration = new CommunicatorConfiguration(
    apiKey,
    apiSecret,
    'https://preprod.commerce-api.payone.com',
  );

  const commerceCaseApiClientExample = new CommerceCaseApiExample(communicatorConfiguration);

  // await commerceCaseApiClientExample.runPostOne();
  // await commerceCaseApiClientExample.runGetAll();

  // await commerceCaseApiClientExample.runGetOne();

  await commerceCaseApiClientExample.runUpdateOne();
};

run();
