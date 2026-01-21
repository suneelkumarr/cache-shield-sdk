import {
  CacheShieldConfig,
  CacheType,
  ClearResult,
  CacheTypeResult,
  CacheShieldError,
  ClearProgress
} from './types';
import { BrowserCacheStrategy } from './strategies/BrowserCacheStrategy';
import { ServiceWorkerStrategy } from './strategies/ServiceWorkerStrategy';
import { StorageStrategy } from './strategies/StorageStrategy';
import { IndexedDBStrategy } from './strategies/IndexedDBStrategy';
import { SmartReloader } from './strategies/SmartReloader';
import { BfCacheStrategy } from './strategies/BfCacheStrategy';
import { Logger } from '../utils/logger';
import { detectCapabilities } from '../utils/detector';
import { Capabilities } from './types';

export class CacheShield {
  private config: Required<CacheShieldConfig>;
  private logger: Logger;
  private capabilities: Capabilities;
  
  // Strategy instances
  private browserCache: BrowserCacheStrategy;
  private serviceWorker: ServiceWorkerStrategy;
  private storage: StorageStrategy;
  private indexedDB: IndexedDBStrategy;
  private reloader: SmartReloader;
  private bfCache: BfCacheStrategy;

  // Default configuration
  private static readonly DEFAULTS: Required<CacheShieldConfig> = {
    targets: ['all'],
    include: [],
    exclude: [],
    cookies: {
      preserveEssential: true,
      essentialCookies: ['csrf', 'session', 'auth']
    },
    indexedDB: {
      deleteDatabase: true
    },
    storage: {
      preserveKeys: []
    },
    debug: false,
    hooks: {},
    autoReload: false,
    reloadDelay: 100,
    preventBfCache: false
  };

  constructor(config: CacheShieldConfig = {}) {
    this.config = this.mergeConfig(config);
    this.logger = new Logger(this.config.debug);
    this.capabilities = detectCapabilities();
    
    // Initialize strategies
    this.browserCache = new BrowserCacheStrategy(this.config, this.logger);
    this.serviceWorker = new ServiceWorkerStrategy(this.config, this.logger);
    this.storage = new StorageStrategy(this.config, this.logger);
    this.indexedDB = new IndexedDBStrategy(this.config, this.logger);
    this.reloader = new SmartReloader(this.logger);
    this.bfCache = new BfCacheStrategy(this.logger);

    // Initialize BfCache protection if enabled
    if (this.config.preventBfCache) {
      this.bfCache.init();
    }
    
    this.logger.info('CacheShield initialized', { 
      config: this.config,
      capabilities: this.capabilities 
    });
  }

  /**
   * Cleanup any event listeners
   */
  destroy(): void {
    this.bfCache.destroy();
  }

  /**
   * Clear all caches based on configuration
   */
  async clear(options?: Partial<CacheShieldConfig>): Promise<ClearResult> {
    const startTime = performance.now();
    const config = options ? this.mergeConfig({ ...this.config, ...options }) : this.config;
    const targets = this.resolveTargets(config.targets);
    
    this.logger.info('Starting cache clear', { targets });
    
    // Execute before hook
    try {
      await config.hooks.onBeforeClear?.(targets);
    } catch (error) {
      this.logger.error('onBeforeClear hook failed', error);
    }
    
    const results: CacheTypeResult[] = [];
    const total = targets.length;
    let completed = 0;

    // Check if both serviceWorker and cacheAPI are present to avoid double clearing
    const hasCacheAPI = targets.includes('cacheAPI');

    for (const target of targets) {
      try {
        const result = await this.clearCacheType(target, { 
          skipCacheClear: target === 'serviceWorker' && hasCacheAPI 
        });
        results.push(result);
        
        if (result.success) {
          this.logger.success(`Cleared ${target}`, result);
        } else {
          this.logger.warn(`Failed to clear ${target}`, result);
        }
      } catch (error) {
        const cacheError = this.wrapError(error, target);
        try {
          config.hooks.onError?.(cacheError);
        } catch (hookError) {
          this.logger.error('onError hook failed', hookError);
        }
        
        results.push({
          type: target,
          success: false,
          error: cacheError.message
        });
      }
      
      completed++;
      try {
        config.hooks.onProgress?.({
          current: target,
          completed,
          total,
          percentage: Math.round((completed / total) * 100)
        });
      } catch (error) {
        this.logger.error('onProgress hook failed', error);
      }
    }

    const duration = performance.now() - startTime;
    const clearResult: ClearResult = {
      success: results.every(r => r.success),
      cleared: results.filter(r => r.success),
      failed: results.filter(r => !r.success),
      timestamp: Date.now(),
      duration
    };

    this.logger.info('Cache clear completed', clearResult);
    
    // Execute after hook
    try {
      await config.hooks.onAfterClear?.(clearResult);
    } catch (error) {
      this.logger.error('onAfterClear hook failed', error);
    }
    
    // Auto reload if configured
    if (config.autoReload && clearResult.success) {
      setTimeout(() => {
        this.reloader.reload(true);
      }, config.reloadDelay);
    }

    return clearResult;
  }

  /**
   * Clear specific cache type
   */
  private async clearCacheType(type: CacheType, options: { skipCacheClear?: boolean } = {}): Promise<CacheTypeResult> {
    switch (type) {
      case 'serviceWorker':
        return this.serviceWorker.clear(options);
        
      case 'cacheAPI':
        return this.browserCache.clearCacheAPI();
        
      case 'localStorage':
        return this.storage.clearLocalStorage();
        
      case 'sessionStorage':
        return this.storage.clearSessionStorage();
        
      case 'indexedDB':
        return this.indexedDB.clear();
        
      case 'cookies':
        return this.browserCache.clearCookies();
        
      default:
        return {
          type,
          success: false,
          error: `Unknown cache type: ${type}`
        };
    }
  }

  /**
   * Clear only Service Workers
   */
  async clearServiceWorkers(): Promise<CacheTypeResult> {
    return this.serviceWorker.clear();
  }

  /**
   * Clear only Cache API storage
   */
  async clearCacheAPI(): Promise<CacheTypeResult> {
    return this.browserCache.clearCacheAPI();
  }

  /**
   * Clear only localStorage
   */
  async clearLocalStorage(): Promise<CacheTypeResult> {
    return this.storage.clearLocalStorage();
  }

  /**
   * Clear only sessionStorage
   */
  async clearSessionStorage(): Promise<CacheTypeResult> {
    return this.storage.clearSessionStorage();
  }

  /**
   * Clear only IndexedDB
   */
  async clearIndexedDB(): Promise<CacheTypeResult> {
    return this.indexedDB.clear();
  }

  /**
   * Clear only cookies
   */
  async clearCookies(): Promise<CacheTypeResult> {
    return this.browserCache.clearCookies();
  }

  /**
   * Force hard reload (bypass cache)
   */
  hardReload(): void {
    this.reloader.reload(true);
  }

  /**
   * Clear and reload
   */
  async clearAndReload(options?: Partial<CacheShieldConfig>): Promise<void> {
    await this.clear(options);
    this.hardReload();
  }

  /**
   * Get estimated storage usage
   */
  async getStorageEstimate(): Promise<StorageEstimate | null> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      return navigator.storage.estimate();
    }
    return null;
  }

  /**
   * Check browser capabilities
   */
  getCapabilities(): Capabilities {
    return this.capabilities;
  }

  /**
   * Resolve 'all' target to specific types
   */
  private resolveTargets(targets: CacheType[]): CacheType[] {
    if (targets.includes('all')) {
      const allTypes: CacheType[] = [
        'serviceWorker',
        'cacheAPI',
        'localStorage',
        'sessionStorage',
        'indexedDB',
        'cookies'
      ];
      
      // Filter based on capabilities
      return allTypes.filter(type => {
        switch (type) {
          case 'serviceWorker':
            return this.capabilities.serviceWorker;
          case 'cacheAPI':
            return this.capabilities.cacheAPI;
          case 'indexedDB':
            return this.capabilities.indexedDB;
          default:
            return true;
        }
      });
    }
    
    return targets;
  }

  /**
   * Merge user config with defaults
   */
  private mergeConfig(config: CacheShieldConfig): Required<CacheShieldConfig> {
    return {
      ...CacheShield.DEFAULTS,
      ...config,
      cookies: { ...CacheShield.DEFAULTS.cookies, ...config.cookies },
      indexedDB: { ...CacheShield.DEFAULTS.indexedDB, ...config.indexedDB },
      storage: { ...CacheShield.DEFAULTS.storage, ...config.storage },
      hooks: { ...CacheShield.DEFAULTS.hooks, ...config.hooks }
    };
  }

  /**
   * Wrap error in CacheShieldError
   */
  private wrapError(error: unknown, cacheType: CacheType): CacheShieldError {
    if (error instanceof CacheShieldError) {
      return error;
    }
    
    const originalError = error instanceof Error ? error : new Error(String(error));
    
    return new CacheShieldError(
      `Failed to clear ${cacheType}: ${originalError.message}`,
      'UNKNOWN',
      cacheType,
      originalError
    );
  }
}