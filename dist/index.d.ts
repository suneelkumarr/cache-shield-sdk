export { CacheShield } from './core/CacheShield';
export type { CacheShieldConfig, CacheType, ClearResult, CacheTypeResult, ClearProgress, CookieOptions, IndexedDBOptions, StorageOptions, CacheShieldHooks, Capabilities } from './core/types';
export { CacheShieldError } from './core/types';
import { CacheShield } from './core/CacheShield';
import { CacheShieldConfig, ClearResult } from './core/types';
/**
 * Quick clear function - creates instance and clears
 */
export declare function clearCache(options?: CacheShieldConfig): Promise<ClearResult>;
export declare function getCacheShield(config?: CacheShieldConfig): CacheShield;
export default CacheShield;
