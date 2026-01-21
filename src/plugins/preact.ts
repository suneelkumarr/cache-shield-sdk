import { h, createContext, ComponentChildren } from 'preact';
import { useContext, useCallback, useState } from 'preact/hooks';
import { CacheShield } from '../core/CacheShield';
import { CacheShieldConfig, ClearResult, CacheType, Capabilities } from '../core/types';

interface CacheShieldContextValue {
  shield: CacheShield;
  isClearing: boolean;
  lastResult: ClearResult | null;
  clear: (options?: Partial<CacheShieldConfig>) => Promise<ClearResult>;
  clearType: (type: CacheType) => Promise<void>;
  hardReload: () => void;
  capabilities: Capabilities;
}

const CacheShieldContext = createContext<CacheShieldContextValue | null>(null);

interface ProviderProps {
  children: ComponentChildren;
  config?: CacheShieldConfig;
}

export function CacheShieldProvider({ children, config }: ProviderProps) {
  const [shield] = useState(() => new CacheShield(config));
  const [isClearing, setIsClearing] = useState(false);
  const [lastResult, setLastResult] = useState<ClearResult | null>(null);

  const clear = useCallback(async (options?: Partial<CacheShieldConfig>) => {
    setIsClearing(true);
    try {
      const result = await shield.clear(options);
      setLastResult(result);
      return result;
    } finally {
      setIsClearing(false);
    }
  }, [shield]);

  const clearType = useCallback(async (type: CacheType) => {
    setIsClearing(true);
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
      setIsClearing(false);
    }
  }, [shield]);

  const hardReload = useCallback(() => shield.hardReload(), [shield]);

  const value = {
    shield,
    isClearing,
    lastResult,
    clear,
    clearType,
    hardReload,
    capabilities: shield.getCapabilities()
  };

  return h(CacheShieldContext.Provider, { value }, children);
}

export function useCacheShield() {
  const context = useContext(CacheShieldContext);
  if (!context) throw new Error('useCacheShield must be used within CacheShieldProvider');
  return context;
}
