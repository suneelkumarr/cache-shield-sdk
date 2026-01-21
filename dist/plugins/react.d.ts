import React, { ReactNode } from 'react';
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
interface CacheShieldProviderProps {
    children: ReactNode;
    config?: CacheShieldConfig;
}
export declare function CacheShieldProvider({ children, config }: CacheShieldProviderProps): React.JSX.Element;
export declare function useCacheShield(): CacheShieldContextValue;
export declare function useCacheShieldSimple(config?: CacheShieldConfig): {
    clear: (options?: Partial<CacheShieldConfig>) => Promise<ClearResult>;
    isClearing: boolean;
    lastResult: ClearResult | null;
    shield: CacheShield;
};
interface ClearCacheButtonProps {
    children?: ReactNode;
    onSuccess?: (result: ClearResult) => void;
    onError?: (error: Error) => void;
    options?: Partial<CacheShieldConfig>;
    className?: string;
    disabled?: boolean;
}
export declare function ClearCacheButton({ children, onSuccess, onError, options, className, disabled }: ClearCacheButtonProps): React.JSX.Element;
export {};
