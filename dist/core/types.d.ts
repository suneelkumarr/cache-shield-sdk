export type CacheType = 'all' | 'serviceWorker' | 'cacheAPI' | 'localStorage' | 'sessionStorage' | 'indexedDB' | 'cookies';
export interface CacheShieldConfig {
    /** Cache types to clear */
    targets?: CacheType[];
    /** Only clear caches matching these patterns */
    include?: (string | RegExp)[];
    /** Exclude caches matching these patterns */
    exclude?: (string | RegExp)[];
    /** Cookie-specific options */
    cookies?: CookieOptions;
    /** IndexedDB-specific options */
    indexedDB?: IndexedDBOptions;
    /** Storage-specific options */
    storage?: StorageOptions;
    /** Enable debug logging */
    debug?: boolean;
    /** Callback hooks */
    hooks?: CacheShieldHooks;
    /** Auto-reload after clearing */
    autoReload?: boolean;
    /** Delay before reload (ms) */
    reloadDelay?: number;
    /**
     * Prevent Back-Forward Cache (bfcache)
     * Forces reload when user navigates back to this page
     * @default false
     */
    preventBfCache?: boolean;
}
export interface CookieOptions {
    /** Only clear cookies with these names */
    names?: string[];
    /** Clear cookies for specific domains */
    domains?: string[];
    /**
     * Explicit override for cookie domain clearing
     * Useful for SLDs like .co.uk where auto-detection fails
     */
    domain?: string;
    /** Clear cookies for specific paths */
    paths?: string[];
    /** Preserve essential cookies */
    preserveEssential?: boolean;
    /** Essential cookie names to preserve */
    essentialCookies?: string[];
}
export interface IndexedDBOptions {
    /** Database names to clear */
    databases?: string[];
    /** Delete entire databases vs just data */
    deleteDatabase?: boolean;
}
export interface StorageOptions {
    /** Only clear keys matching pattern */
    keyPattern?: RegExp;
    /** Preserve keys matching pattern */
    preservePattern?: RegExp;
    /** Specific keys to preserve */
    preserveKeys?: string[];
}
export interface CacheShieldHooks {
    /** Called before clearing starts */
    onBeforeClear?: (targets: CacheType[]) => void | Promise<void>;
    /** Called after clearing completes */
    onAfterClear?: (result: ClearResult) => void | Promise<void>;
    /** Called on error */
    onError?: (error: CacheShieldError) => void;
    /** Progress callback */
    onProgress?: (progress: ClearProgress) => void;
}
export interface ClearResult {
    success: boolean;
    cleared: CacheTypeResult[];
    failed: CacheTypeResult[];
    timestamp: number;
    duration: number;
}
export interface CacheTypeResult {
    type: CacheType;
    success: boolean;
    itemsCleared?: number;
    bytesFreed?: number;
    error?: string;
}
export interface ClearProgress {
    current: CacheType;
    completed: number;
    total: number;
    percentage: number;
}
export declare class CacheShieldError extends Error {
    code: ErrorCode;
    cacheType?: CacheType | undefined;
    originalError?: Error | undefined;
    constructor(message: string, code: ErrorCode, cacheType?: CacheType | undefined, originalError?: Error | undefined);
}
export type ErrorCode = 'PERMISSION_DENIED' | 'NOT_SUPPORTED' | 'TIMEOUT' | 'UNKNOWN' | 'PARTIAL_FAILURE';
export interface Capabilities {
    serviceWorker: boolean;
    cacheAPI: boolean;
    indexedDB: boolean;
    localStorage: boolean;
    sessionStorage: boolean;
    cookies: boolean;
    storageEstimate: boolean;
    persistentStorage: boolean;
}
