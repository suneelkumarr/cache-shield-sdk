import { Logger } from '../../utils/logger';
export declare class SmartReloader {
    private logger;
    constructor(logger: Logger);
    /**
     * Reload the page with cache-busting logic
     */
    reload(forceBypass?: boolean): void;
    private performCacheBustedReload;
}
