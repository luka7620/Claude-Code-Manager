const STORAGE_KEY = 'ccm-enter-sends';
const EVENT_NAME = 'ccm-enter-sends-changed';

export function getEnterSends(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setEnterSends(value: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch { /* storage may be unavailable */ }
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function subscribeEnterSends(callback: () => void): () => void {
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener('storage', callback);
  };
}
