import { ref, reactive, readonly, App, inject, InjectionKey } from 'vue';
import { CacheShield } from '../core/CacheShield';
import { CacheShieldConfig, ClearResult, CacheType, Capabilities } from '../core/types';

// Injection key
export const CacheShieldKey: InjectionKey<ReturnType<typeof createCacheShield>> = 
  Symbol('CacheShield');

// Composable factory
export function createCacheShield(config?: CacheShieldConfig) {
  const shield = new CacheShield(config);
  const isClearing = ref(false);
  const lastResult = ref<ClearResult | null>(null);
  const capabilities = reactive(shield.getCapabilities());

  async function clear(options?: Partial<CacheShieldConfig>): Promise<ClearResult> {
    isClearing.value = true;
    try {
      const result = await shield.clear(options);
      lastResult.value = result;
      return result;
    } finally {
      isClearing.value = false;
    }
  }

  async function clearType(type: CacheType): Promise<void> {
    isClearing.value = true;
    try {
      switch (type) {
        case 'serviceWorker':
          await shield.clearServiceWorkers();
          break;
        case 'localStorage':
          await shield.clearLocalStorage();
          break;
        case 'sessionStorage':
          await shield.clearSessionStorage();
          break;
        case 'indexedDB':
          await shield.clearIndexedDB();
          break;
        case 'cookies':
          await shield.clearCookies();
          break;
        case 'cacheAPI':
          await shield.clearCacheAPI();
          break;
      }
    } finally {
      isClearing.value = false;
    }
  }

  function hardReload(): void {
    shield.hardReload();
  }

  async function clearAndReload(options?: Partial<CacheShieldConfig>): Promise<void> {
    await clear(options);
    hardReload();
  }

  return {
    shield,
    isClearing: readonly(isClearing),
    lastResult: readonly(lastResult),
    capabilities: readonly(capabilities),
    clear,
    clearType,
    hardReload,
    clearAndReload
  };
}

// Vue plugin
export function CacheShieldPlugin(app: App, config?: CacheShieldConfig): void {
  const cacheShield = createCacheShield(config);
  app.provide(CacheShieldKey, cacheShield);
  
  // Also add to global properties for Options API
  app.config.globalProperties.$cacheShield = cacheShield;
}

// Composable hook
export function useCacheShield() {
  const cacheShield = inject(CacheShieldKey);
  
  if (!cacheShield) {
    throw new Error(
      'CacheShield not found. Did you install the CacheShieldPlugin?'
    );
  }
  
  return cacheShield;
}

// Simple composable without plugin
export function useCacheShieldSimple(config?: CacheShieldConfig) {
  return createCacheShield(config);
}

// Type augmentation for Options API
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $cacheShield: ReturnType<typeof createCacheShield>;
  }
}

export default CacheShieldPlugin;