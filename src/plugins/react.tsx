import React, { 
  createContext, 
  useContext, 
  useCallback, 
  useState,
  useEffect,
  ReactNode 
} from 'react';
import { CacheShield } from '../core/CacheShield';
import { 
  CacheShieldConfig, 
  ClearResult, 
  CacheType,
  Capabilities 
} from '../core/types';

// Context
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

// Provider
interface CacheShieldProviderProps {
  children: ReactNode;
  config?: CacheShieldConfig;
}

export function CacheShieldProvider({ 
  children, 
  config 
}: CacheShieldProviderProps): React.JSX.Element {
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
      setIsClearing(false);
    }
  }, [shield]);

  const hardReload = useCallback(() => {
    shield.hardReload();
  }, [shield]);

  const value: CacheShieldContextValue = {
    shield,
    isClearing,
    lastResult,
    clear,
    clearType,
    hardReload,
    capabilities: shield.getCapabilities()
  };

  return (
    <CacheShieldContext.Provider value={value}>
      {children}
    </CacheShieldContext.Provider>
  );
}

// Hook
export function useCacheShield(): CacheShieldContextValue {
  const context = useContext(CacheShieldContext);
  
  if (!context) {
    throw new Error('useCacheShield must be used within CacheShieldProvider');
  }
  
  return context;
}

// Simple hook without provider
export function useCacheShieldSimple(config?: CacheShieldConfig) {
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

  return {
    clear,
    isClearing,
    lastResult,
    shield
  };
}

// Component
interface ClearCacheButtonProps {
  children?: ReactNode;
  onSuccess?: (result: ClearResult) => void;
  onError?: (error: Error) => void;
  options?: Partial<CacheShieldConfig>;
  className?: string;
  disabled?: boolean;
}

export function ClearCacheButton({
  children = 'Clear Cache',
  onSuccess,
  onError,
  options,
  className,
  disabled
}: ClearCacheButtonProps): React.JSX.Element {
  const { clear, isClearing } = useCacheShield();

  const handleClick = async () => {
    try {
      const result = await clear(options);
      onSuccess?.(result);
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isClearing}
      className={className}
    >
      {isClearing ? 'Clearing...' : children}
    </button>
  );
}