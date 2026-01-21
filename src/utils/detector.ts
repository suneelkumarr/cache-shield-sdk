import { Capabilities } from '../core/types';

export { Capabilities };

export function detectCapabilities(): Capabilities {
  return {
    serviceWorker: 'serviceWorker' in navigator,
    cacheAPI: 'caches' in window,
    indexedDB: 'indexedDB' in window,
    localStorage: checkStorage('localStorage'),
    sessionStorage: checkStorage('sessionStorage'),
    cookies: navigator.cookieEnabled,
    storageEstimate: 'storage' in navigator && 'estimate' in navigator.storage,
    persistentStorage: 'storage' in navigator && 'persist' in navigator.storage
  };
}

function checkStorage(type: 'localStorage' | 'sessionStorage'): boolean {
  try {
    const storage = window[type];
    const testKey = '__cache_shield_test__';
    storage.setItem(testKey, 'test');
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function isSecureContext(): boolean {
  return isBrowser() && window.isSecureContext;
}