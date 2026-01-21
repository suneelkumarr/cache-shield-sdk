// Core
export { CacheShield } from './core/CacheShield';

// Types
export type {
  CacheShieldConfig,
  CacheType,
  ClearResult,
  CacheTypeResult,
  ClearProgress,
  CookieOptions,
  IndexedDBOptions,
  StorageOptions,
  CacheShieldHooks,
  Capabilities
} from './core/types';

export { CacheShieldError } from './core/types';

// Plugins - Framework integrations available via separate entry points
// Import from specific framework bundles:
// - import { ... } from 'cache-shield-sdk/react'
// - import { ... } from 'cache-shield-sdk/vue'
// - import { ... } from 'cache-shield-sdk/angular'
// - etc.

// All framework plugins are optional peer dependencies

// Convenience function
import { CacheShield } from './core/CacheShield';
import { CacheShieldConfig, ClearResult } from './core/types';

/**
 * Quick clear function - creates instance and clears
 */
export async function clearCache(options?: CacheShieldConfig): Promise<ClearResult> {
  const shield = new CacheShield(options);
  return shield.clear();
}

/**
 * Create singleton instance
 */
let instance: CacheShield | null = null;

export function getCacheShield(config?: CacheShieldConfig): CacheShield {
  if (!instance) {
    instance = new CacheShield(config);
  }
  return instance;
}

// Default export
export default CacheShield;