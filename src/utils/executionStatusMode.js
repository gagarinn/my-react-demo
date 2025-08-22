export const EXECUTION_STATUS_MODE_KEY = 'executionStatusMode';
export const EXECUTION_MODE_CHECKBOX = 'checkbox';
export const EXECUTION_MODE_STRIKE = 'strike';

export function getExecutionStatusMode() {
  const m = localStorage.getItem(EXECUTION_STATUS_MODE_KEY);
  return m === EXECUTION_MODE_STRIKE ? EXECUTION_MODE_STRIKE : EXECUTION_MODE_CHECKBOX;
}

export function toggleExecutionStatusMode() {
  const current = getExecutionStatusMode();
  const next = current === EXECUTION_MODE_CHECKBOX ? EXECUTION_MODE_STRIKE : EXECUTION_MODE_CHECKBOX;
  localStorage.setItem(EXECUTION_STATUS_MODE_KEY, next);
  return next;
}

export function setExecutionStatusMode(mode) {
  const next = mode === EXECUTION_MODE_STRIKE ? EXECUTION_MODE_STRIKE : EXECUTION_MODE_CHECKBOX;
  localStorage.setItem(EXECUTION_STATUS_MODE_KEY, next);
  return next;
}
