import { CacheShieldConfig, ClearResult, CacheTypeResult } from './types';
import { Capabilities } from './types';
export declare class CacheShield {
    private config;
    private logger;
    private capabilities;
    private browserCache;
    private serviceWorker;
    private storage;
    private indexedDB;
    private reloader;
    private bfCache;
    private static readonly DEFAULTS;
    constructor(config?: CacheShieldConfig);
    /**
     * Cleanup any event listeners
     */
    destroy(): void;
    /**
     * Clear all caches based on configuration
     */
    clear(options?: Partial<CacheShieldConfig>): Promise<ClearResult>;
    /**
     * Clear specific cache type
     */
    private clearCacheType;
    /**
     * Clear only Service Workers
     */
    clearServiceWorkers(): Promise<CacheTypeResult>;
    /**
     * Clear only Cache API storage
     */
    clearCacheAPI(): Promise<CacheTypeResult>;
    /**
     * Clear only localStorage
     */
    clearLocalStorage(): Promise<CacheTypeResult>;
    /**
     * Clear only sessionStorage
     */
    clearSessionStorage(): Promise<CacheTypeResult>;
    /**
     * Clear only IndexedDB
     */
    clearIndexedDB(): Promise<CacheTypeResult>;
    /**
     * Clear only cookies
     */
    clearCookies(): Promise<CacheTypeResult>;
    /**
     * Force hard reload (bypass cache)
     */
    hardReload(): void;
    /**
     * Clear and reload
     */
    clearAndReload(options?: Partial<CacheShieldConfig>): Promise<void>;
    /**
     * Get estimated storage usage
     */
    getStorageEstimate(): Promise<StorageEstimate | null>;
    /**
     * Check browser capabilities
     */
    getCapabilities(): Capabilities;
    /**
     * Resolve 'all' target to specific types
     */
    private resolveTargets;
    /**
     * Merge user config with defaults
     */
    private mergeConfig;
    /**
     * Wrap error in CacheShieldError
     */
    private wrapError;
}
