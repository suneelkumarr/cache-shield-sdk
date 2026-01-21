import { Logger } from '../../utils/logger';
export declare class BfCacheStrategy {
    private logger;
    private initialized;
    private handler;
    constructor(logger: Logger);
    /**
     * Initialize listener for Back-Forward Cache restores
     */
    init(): void;
    /**
     * Cleanup listeners
     */
    destroy(): void;
}
