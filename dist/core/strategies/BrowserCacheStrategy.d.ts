import { CacheShieldConfig, CacheTypeResult } from '../types';
import { Logger } from '../../utils/logger';
export declare class BrowserCacheStrategy {
    private config;
    private logger;
    constructor(config: CacheShieldConfig, logger: Logger);
    clearCacheAPI(): Promise<CacheTypeResult>;
    clearCookies(): Promise<CacheTypeResult>;
    private parseCookies;
    private deleteCookie;
    private deleteCookieWithDomain;
    private shouldExclude;
    private shouldInclude;
}
