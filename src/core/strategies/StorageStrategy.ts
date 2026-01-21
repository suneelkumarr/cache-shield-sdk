import { CacheShieldConfig, CacheTypeResult, CacheShieldError } from '../types';
import { Logger } from '../../utils/logger';

export class StorageStrategy {
  constructor(
    private config: CacheShieldConfig,
    private logger: Logger
  ) {}

  async clearLocalStorage(): Promise<CacheTypeResult> {
    return this.clearStorage('localStorage', localStorage);
  }

  async clearSessionStorage(): Promise<CacheTypeResult> {
    return this.clearStorage('sessionStorage', sessionStorage);
  }

  private async clearStorage(
    type: 'localStorage' | 'sessionStorage',
    storage: Storage
  ): Promise<CacheTypeResult> {
    try {
      const { storage: storageConfig } = this.config;
      const preserveKeys = storageConfig?.preserveKeys || [];
      const preservePattern = storageConfig?.preservePattern;
      const keyPattern = storageConfig?.keyPattern;

      const keysToRemove: string[] = [];
      const keysToPreserve: string[] = [];

      // Collect keys to remove
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (!key) continue;

        // Check if should preserve
        if (preserveKeys.includes(key)) {
          keysToPreserve.push(key);
          continue;
        }

        if (preservePattern && preservePattern.test(key)) {
          keysToPreserve.push(key);
          continue;
        }

        // Check if matches key pattern (if specified)
        if (keyPattern && !keyPattern.test(key)) {
          continue;
        }

        keysToRemove.push(key);
      }

      // Calculate bytes being freed (approximate)
      let bytesFreed = 0;
      for (const key of keysToRemove) {
        const value = storage.getItem(key);
        if (value) {
          bytesFreed += key.length + value.length;
        }
      }
      bytesFreed *= 2; // UTF-16

      // Remove keys
      for (const key of keysToRemove) {
        storage.removeItem(key);
        this.logger.debug(`Removed ${type} key: ${key}`);
      }

      this.logger.info(`${type} cleared`, {
        removed: keysToRemove.length,
        preserved: keysToPreserve.length
      });

      return {
        type,
        success: true,
        itemsCleared: keysToRemove.length,
        bytesFreed
      };
    } catch (error) {
      throw new CacheShieldError(
        `Failed to clear ${type}`,
        'UNKNOWN',
        type,
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Get storage usage stats
   */
  getStorageStats(): { localStorage: number; sessionStorage: number } {
    return {
      localStorage: this.calculateStorageSize(localStorage),
      sessionStorage: this.calculateStorageSize(sessionStorage)
    };
  }

  private calculateStorageSize(storage: Storage): number {
    let total = 0;
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key) {
        const value = storage.getItem(key) || '';
        total += (key.length + value.length) * 2;
      }
    }
    return total;
  }
}