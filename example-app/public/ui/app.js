import { discover } from './api.js';
import { demo } from './demos.js';
import { createIdInputs, element, idNames } from './dom.js';
import { createExplorer } from './explorer.js';
import { clearHistory } from './history.js';

let busy = false;

async function run(action) {
  if (busy) return;
  busy = true;
  for (const button of document.querySelectorAll('button')) button.disabled = true;
  element('feedback').className = '';
  element('feedback').textContent = 'Request läuft …';
  try {
    await action();
    element('feedback').textContent = 'Erfolgreich abgeschlossen.';
  } catch (error) {
    element('feedback').className = 'error';
    element('feedback').textContent = error.message;
  } finally {
    busy = false;
    for (const button of document.querySelectorAll('button')) button.disabled = false;
  }
}

async function initialize() {
  createIdInputs();
  try {
    const { routes, config } = await discover();
    for (const name of idNames) element(name).value = config[name] ?? '';
    const explorer = createExplorer(routes);
    element('operation').addEventListener('change', explorer.updateBodyState);
    element('request-form').addEventListener('submit', (event) => {
      event.preventDefault();
      run(explorer.sendEditor);
    });
    for (const button of document.querySelectorAll('[data-demo]')) {
      button.addEventListener('click', () => run(() => demo(button.dataset.demo, explorer)));
    }
    element('clear').addEventListener('click', clearHistory);
    element('connection').textContent = `Verbunden · Merchant ${config.merchantId}`;
  } catch (error) {
    element('connection').textContent = error.message;
    element('connection').className = 'error';
  }
}

initialize();
