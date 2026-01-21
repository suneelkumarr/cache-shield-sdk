import { CacheShieldConfig, CacheTypeResult } from '../types';
import { Logger } from '../../utils/logger';
export declare class IndexedDBStrategy {
    private config;
    private logger;
    constructor(config: CacheShieldConfig, logger: Logger);
    clear(): Promise<CacheTypeResult>;
    private getDatabases;
    private deleteDatabase;
    private clearDatabaseData;
    private shouldExclude;
}
