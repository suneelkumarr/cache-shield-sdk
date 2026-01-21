import { CacheShieldConfig, CacheTypeResult } from '../types';
import { Logger } from '../../utils/logger';
export declare class ServiceWorkerStrategy {
    private config;
    private logger;
    constructor(config: CacheShieldConfig, logger: Logger);
    clear(options?: {
        skipCacheClear?: boolean;
    }): Promise<CacheTypeResult>;
    private clearServiceWorkerCaches;
    private shouldExclude;
    /**
     * Update Service Worker (skip waiting)
     */
    update(): Promise<boolean>;
}
