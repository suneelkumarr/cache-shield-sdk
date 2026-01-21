import { writable, get } from 'svelte/store';
import { setContext, getContext } from 'svelte';
import { CacheShield } from '../core/CacheShield';
import { CacheShieldConfig, ClearResult, CacheType, Capabilities } from '../core/types';

const KEY = Symbol('CACHE_SHIELD');

// Store Factory
export function createCacheShieldStore(config?: CacheShieldConfig) {
  const shield = new CacheShield(config);
  
  // Reactive state
  const isClearing = writable(false);
  const lastResult = writable<ClearResult | null>(null);
  const capabilities = writable<Capabilities>(shield.getCapabilities());

  // Methods
  async function clear(options?: Partial<CacheShieldConfig>): Promise<ClearResult> {
    isClearing.set(true);
    try {
      const result = await shield.clear(options);
      lastResult.set(result);
      return result;
    } finally {
      isClearing.set(false);
    }
  }

  async function clearType(type: CacheType): Promise<void> {
    isClearing.set(true);
    try {
      switch (type) {
        case 'serviceWorker': await shield.clearServiceWorkers(); break;
        case 'localStorage': await shield.clearLocalStorage(); break;
        case 'sessionStorage': await shield.clearSessionStorage(); break;
        case 'indexedDB': await shield.clearIndexedDB(); break;
        case 'cookies': await shield.clearCookies(); break;
        case 'cacheAPI': await shield.clearCacheAPI(); break;
      }
    } finally {
      isClearing.set(false);
    }
  }

  return {
    shield,
    isClearing: { subscribe: isClearing.subscribe },
    lastResult: { subscribe: lastResult.subscribe },
    capabilities: { subscribe: capabilities.subscribe },
    clear,
    clearType,
    hardReload: () => shield.hardReload(),
    clearAndReload: async (options?: Partial<CacheShieldConfig>) => {
      await clear(options);
      shield.hardReload();
    }
  };
}

// Context Provider (for component setup)
export function setCacheShield(store: ReturnType<typeof createCacheShieldStore>) {
  setContext(KEY, store);
}

// Hook
export function useCacheShield() {
  const store = getContext<ReturnType<typeof createCacheShieldStore>>(KEY);
  if (!store) {
    throw new Error('CacheShield not found. Call setCacheShield() first.');
  }
  return store;
}
