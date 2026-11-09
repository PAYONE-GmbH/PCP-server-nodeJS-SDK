export const element = (id) => document.getElementById(id);

export const idNames = [
  'commerceCaseId',
  'checkoutId',
  'paymentExecutionId',
  'paymentInformationId',
  'paymentIntentId',
  'eventId',
];

export function createIdInputs() {
  for (const name of idNames) {
    const wrapper = document.createElement('div');
    const label = document.createElement('label');
    label.htmlFor = name;
    label.textContent = name;
    const input = document.createElement('input');
    input.id = name;
    input.placeholder = name;
    wrapper.append(label, input);
    element('ids').append(wrapper);
  }
}

export function rememberIds(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return;
  for (const name of idNames) {
    if (typeof body[name] === 'string') element(name).value = body[name];
  }
}
