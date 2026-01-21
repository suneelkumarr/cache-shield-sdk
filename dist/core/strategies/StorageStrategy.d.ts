import { CacheShieldConfig, CacheTypeResult } from '../types';
import { Logger } from '../../utils/logger';
export declare class StorageStrategy {
    private config;
    private logger;
    constructor(config: CacheShieldConfig, logger: Logger);
    clearLocalStorage(): Promise<CacheTypeResult>;
    clearSessionStorage(): Promise<CacheTypeResult>;
    private clearStorage;
    /**
     * Get storage usage stats
     */
    getStorageStats(): {
        localStorage: number;
        sessionStorage: number;
    };
    private calculateStorageSize;
}
