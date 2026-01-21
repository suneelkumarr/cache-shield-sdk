import { CacheShieldConfig, CacheTypeResult, CacheShieldError } from '../types';
import { Logger } from '../../utils/logger';

export class ServiceWorkerStrategy {
  constructor(
    private config: CacheShieldConfig,
    private logger: Logger
  ) {}

  async clear(options: { skipCacheClear?: boolean } = {}): Promise<CacheTypeResult> {
    if (!('serviceWorker' in navigator)) {
      return {
        type: 'serviceWorker',
        success: false,
        error: 'Service Workers not supported'
      };
    }

    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      let unregistered = 0;

      for (const registration of registrations) {
        // Check if should be excluded
        if (this.shouldExclude(registration.scope)) {
          this.logger.debug(`Skipping SW: ${registration.scope}`);
          continue;
        }

        const success = await registration.unregister();
        if (success) {
          unregistered++;
          this.logger.debug(`Unregistered SW: ${registration.scope}`);
        }
      }

      // Also clear Cache Storage used by SW (unless skipped)
      if (!options.skipCacheClear) {
        await this.clearServiceWorkerCaches();
      }

      return {
        type: 'serviceWorker',
        success: true,
        itemsCleared: unregistered
      };
    } catch (error) {
      throw new CacheShieldError(
        'Failed to clear Service Workers',
        'UNKNOWN',
        'serviceWorker',
        error instanceof Error ? error : undefined
      );
    }
  }

  private async clearServiceWorkerCaches(): Promise<number> {
    if (!('caches' in window)) {
      return 0;
    }

    const cacheNames = await caches.keys();
    let cleared = 0;

    for (const cacheName of cacheNames) {
      if (this.shouldExclude(cacheName)) {
        continue;
      }

      await caches.delete(cacheName);
      cleared++;
      this.logger.debug(`Deleted cache: ${cacheName}`);
    }

    return cleared;
  }

  private shouldExclude(value: string): boolean {
    const { exclude } = this.config;
    
    if (!exclude || exclude.length === 0) {
      return false;
    }

    return exclude.some(pattern => {
      if (typeof pattern === 'string') {
        return value.includes(pattern);
      }
      return pattern.test(value);
    });
  }

  /**
   * Update Service Worker (skip waiting)
   */
  async update(): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      
      if (registration?.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        return true;
      }

      if (registration) {
        await registration.update();
        return true;
      }

      return false;
    } catch (error) {
      this.logger.error('Failed to update Service Worker', error);
      return false;
    }
  }
}