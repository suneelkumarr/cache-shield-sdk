import { App, InjectionKey } from 'vue';
import { CacheShield } from '../core/CacheShield';
import { CacheShieldConfig, ClearResult, CacheType } from '../core/types';
export declare const CacheShieldKey: InjectionKey<ReturnType<typeof createCacheShield>>;
export declare function createCacheShield(config?: CacheShieldConfig): {
    shield: CacheShield;
    isClearing: Readonly<import("vue").Ref<boolean, boolean>>;
    lastResult: Readonly<import("vue").Ref<{
        readonly success: boolean;
        readonly cleared: readonly {
            readonly type: CacheType;
            readonly success: boolean;
            readonly itemsCleared?: number | undefined;
            readonly bytesFreed?: number | undefined;
            readonly error?: string | undefined;
        }[];
        readonly failed: readonly {
            readonly type: CacheType;
            readonly success: boolean;
            readonly itemsCleared?: number | undefined;
            readonly bytesFreed?: number | undefined;
            readonly error?: string | undefined;
        }[];
        readonly timestamp: number;
        readonly duration: number;
    } | null, {
        readonly success: boolean;
        readonly cleared: readonly {
            readonly type: CacheType;
            readonly success: boolean;
            readonly itemsCleared?: number | undefined;
            readonly bytesFreed?: number | undefined;
            readonly error?: string | undefined;
        }[];
        readonly failed: readonly {
            readonly type: CacheType;
            readonly success: boolean;
            readonly itemsCleared?: number | undefined;
            readonly bytesFreed?: number | undefined;
            readonly error?: string | undefined;
        }[];
        readonly timestamp: number;
        readonly duration: number;
    } | null>>;
    capabilities: {
        readonly serviceWorker: boolean;
        readonly cacheAPI: boolean;
        readonly indexedDB: boolean;
        readonly localStorage: boolean;
        readonly sessionStorage: boolean;
        readonly cookies: boolean;
        readonly storageEstimate: boolean;
        readonly persistentStorage: boolean;
    };
    clear: (options?: Partial<CacheShieldConfig>) => Promise<ClearResult>;
    clearType: (type: CacheType) => Promise<void>;
    hardReload: () => void;
    clearAndReload: (options?: Partial<CacheShieldConfig>) => Promise<void>;
};
export declare function CacheShieldPlugin(app: App, config?: CacheShieldConfig): void;
export declare function useCacheShield(): {
    shield: CacheShield;
    isClearing: Readonly<import("vue").Ref<boolean, boolean>>;
    lastResult: Readonly<import("vue").Ref<{
        readonly success: boolean;
        readonly cleared: readonly {
            readonly type: CacheType;
            readonly success: boolean;
            readonly itemsCleared?: number | undefined;
            readonly bytesFreed?: number | undefined;
            readonly error?: string | undefined;
        }[];
        readonly failed: readonly {
            readonly type: CacheType;
            readonly success: boolean;
            readonly itemsCleared?: number | undefined;
            readonly bytesFreed?: number | undefined;
            readonly error?: string | undefined;
        }[];
        readonly timestamp: number;
        readonly duration: number;
    } | null, {
        readonly success: boolean;
        readonly cleared: readonly {
            readonly type: CacheType;
            readonly success: boolean;
            readonly itemsCleared?: number | undefined;
            readonly bytesFreed?: number | undefined;
            readonly error?: string | undefined;
        }[];
        readonly failed: readonly {
            readonly type: CacheType;
            readonly success: boolean;
            readonly itemsCleared?: number | undefined;
            readonly bytesFreed?: number | undefined;
            readonly error?: string | undefined;
        }[];
        readonly timestamp: number;
        readonly duration: number;
    } | null>>;
    capabilities: {
        readonly serviceWorker: boolean;
        readonly cacheAPI: boolean;
        readonly indexedDB: boolean;
        readonly localStorage: boolean;
        readonly sessionStorage: boolean;
        readonly cookies: boolean;
        readonly storageEstimate: boolean;
        readonly persistentStorage: boolean;
    };
    clear: (options?: Partial<CacheShieldConfig> | undefined) => Promise<ClearResult>;
    clearType: (type: CacheType) => Promise<void>;
    hardReload: () => void;
    clearAndReload: (options?: Partial<CacheShieldConfig> | undefined) => Promise<void>;
};
export declare function useCacheShieldSimple(config?: CacheShieldConfig): {
    shield: CacheShield;
    isClearing: Readonly<import("vue").Ref<boolean, boolean>>;
    lastResult: Readonly<import("vue").Ref<{
        readonly success: boolean;
        readonly cleared: readonly {
            readonly type: CacheType;
            readonly success: boolean;
            readonly itemsCleared?: number | undefined;
            readonly bytesFreed?: number | undefined;
            readonly error?: string | undefined;
        }[];
        readonly failed: readonly {
            readonly type: CacheType;
            readonly success: boolean;
            readonly itemsCleared?: number | undefined;
            readonly bytesFreed?: number | undefined;
            readonly error?: string | undefined;
        }[];
        readonly timestamp: number;
        readonly duration: number;
    } | null, {
        readonly success: boolean;
        readonly cleared: readonly {
            readonly type: CacheType;
            readonly success: boolean;
            readonly itemsCleared?: number | undefined;
            readonly bytesFreed?: number | undefined;
            readonly error?: string | undefined;
        }[];
        readonly failed: readonly {
            readonly type: CacheType;
            readonly success: boolean;
            readonly itemsCleared?: number | undefined;
            readonly bytesFreed?: number | undefined;
            readonly error?: string | undefined;
        }[];
        readonly timestamp: number;
        readonly duration: number;
    } | null>>;
    capabilities: {
        readonly serviceWorker: boolean;
        readonly cacheAPI: boolean;
        readonly indexedDB: boolean;
        readonly localStorage: boolean;
        readonly sessionStorage: boolean;
        readonly cookies: boolean;
        readonly storageEstimate: boolean;
        readonly persistentStorage: boolean;
    };
    clear: (options?: Partial<CacheShieldConfig> | undefined) => Promise<ClearResult>;
    clearType: (type: CacheType) => Promise<void>;
    hardReload: () => void;
    clearAndReload: (options?: Partial<CacheShieldConfig> | undefined) => Promise<void>;
};
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $cacheShield: ReturnType<typeof createCacheShield>;
    }
}
export default CacheShieldPlugin;
