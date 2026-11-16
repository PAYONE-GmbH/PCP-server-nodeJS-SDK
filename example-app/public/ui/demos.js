import { send } from './api.js';
import { element } from './dom.js';

export async function demo(action, explorer) {
  const { selectRoute, resolvedPath, sendEditor } = explorer;
  const casePath = '/api/commerce-cases/:commerceCaseId';
  if (action === 'token') selectRoute('POST', '/api/authentication-tokens');
  if (action === 'create') selectRoute('POST', '/api/commerce-cases');
  if (action === 'list') selectRoute('GET', '/api/commerce-cases', 'offset=2&size=1');
  if (action === 'get' || action === 'city') selectRoute('GET', casePath);
  if (action === 'city') {
    const city = element('city').value.trim();
    if (!city) throw new Error('Bitte eine Stadt eingeben.');
    const current = await send('GET', resolvedPath({ path: casePath }));
    if (!current?.customer?.billingAddress)
      throw new Error('Der Commerce Case hat keine customer.billingAddress.');
    selectRoute('PATCH', casePath, '', {
      customer: {
        ...current.customer,
        billingAddress: { ...current.customer.billingAddress, city },
      },
    });
  }
  await sendEditor();
}
