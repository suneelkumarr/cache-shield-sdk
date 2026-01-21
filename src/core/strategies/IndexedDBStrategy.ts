import { CacheShieldConfig, CacheTypeResult, CacheShieldError } from '../types';
import { Logger } from '../../utils/logger';

export class IndexedDBStrategy {
  constructor(
    private config: CacheShieldConfig,
    private logger: Logger
  ) {}

  async clear(): Promise<CacheTypeResult> {
    if (!('indexedDB' in window)) {
      return {
        type: 'indexedDB',
        success: false,
        error: 'IndexedDB not supported'
      };
    }

    try {
      const databases = await this.getDatabases();
      const { indexedDB: idbConfig } = this.config;
      const targetDatabases = idbConfig?.databases;
      const deleteDatabase = idbConfig?.deleteDatabase ?? true;

      let cleared = 0;

      for (const dbInfo of databases) {
        const dbName = dbInfo.name;
        if (!dbName) continue;

        // Check if specific databases are targeted
        if (targetDatabases && targetDatabases.length > 0) {
          if (!targetDatabases.includes(dbName)) {
            continue;
          }
        }

        // Check exclusions
        if (this.shouldExclude(dbName)) {
          this.logger.debug(`Skipping IndexedDB: ${dbName}`);
          continue;
        }

        if (deleteDatabase) {
          await this.deleteDatabase(dbName);
        } else {
          await this.clearDatabaseData(dbName);
        }
        
        cleared++;
        this.logger.debug(`Cleared IndexedDB: ${dbName}`);
      }

      return {
        type: 'indexedDB',
        success: true,
        itemsCleared: cleared
      };
    } catch (error) {
      throw new CacheShieldError(
        'Failed to clear IndexedDB',
        'UNKNOWN',
        'indexedDB',
        error instanceof Error ? error : undefined
      );
    }
  }

  private async getDatabases(): Promise<IDBDatabaseInfo[]> {
    // Modern browsers support indexedDB.databases()
    if ('databases' in indexedDB) {
      return indexedDB.databases();
    }

    // Fallback: return empty array (can't enumerate DBs in older browsers)
    this.logger.warn('indexedDB.databases() not supported');
    return [];
  }

  private deleteDatabase(name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(name);
      
      request.onsuccess = () => {
        this.logger.debug(`Deleted database: ${name}`);
        resolve();
      };
      
      request.onerror = () => {
        reject(new Error(`Failed to delete database: ${name}`));
      };
      
      request.onblocked = () => {
        this.logger.warn(`Database deletion blocked: ${name}`);
        // Rejecting here allows us to report partial failure instead of silent success
        reject(new Error(`Database deletion blocked (open in another tab): ${name}`));
      };
    });
  }

  private async clearDatabaseData(name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name);
      
      request.onsuccess = async () => {
        const db = request.result;
        const storeNames = Array.from(db.objectStoreNames);
        
        if (storeNames.length === 0) {
          db.close();
          resolve();
          return;
        }

        const transaction = db.transaction(storeNames, 'readwrite');
        
        for (const storeName of storeNames) {
          const store = transaction.objectStore(storeName);
          store.clear();
        }
        
        transaction.oncomplete = () => {
          db.close();
          resolve();
        };
        
        transaction.onerror = () => {
          db.close();
          reject(new Error(`Failed to clear data in: ${name}`));
        };
      };
      
      request.onerror = () => {
        reject(new Error(`Failed to open database: ${name}`));
      };
    });
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
}