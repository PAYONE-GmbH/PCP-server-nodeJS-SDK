import { element } from './dom.js';

export function record(entry) {
  const details = document.createElement('details');
  details.open = true;
  const summary = document.createElement('summary');
  summary.textContent = `${entry.status} · ${entry.method} ${entry.path} · ${entry.durationMs} ms`;
  if (!entry.ok) summary.className = 'error';
  const pre = document.createElement('pre');
  pre.textContent = JSON.stringify(entry, null, 2);
  details.append(summary, pre);
  const history = element('history');
  for (const previous of history.children) previous.open = false;
  history.prepend(details);
  while (history.children.length > 20) history.lastElementChild.remove();
}

export function clearHistory() {
  element('history').replaceChildren();
  element('feedback').textContent = 'Verlauf geleert.';
}
