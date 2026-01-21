import { Logger } from '../../utils/logger';
export declare class BfCacheStrategy {
    private logger;
    private initialized;
    constructor(logger: Logger);
    /**
     * Initialize listener for Back-Forward Cache restores
     */
    init(): void;
}
