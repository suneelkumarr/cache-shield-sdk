import { Logger } from '../../utils/logger';

export class BfCacheStrategy {
  private initialized = false;

  constructor(private logger: Logger) {}

  /**
   * Initialize listener for Back-Forward Cache restores
   */
  init(): void {
    if (this.initialized || typeof window === 'undefined') return;

    window.addEventListener('pageshow', (event) => {
      // event.persisted is true if page was restored from bfcache (memory)
      if (event.persisted) {
        this.logger.info('Page restored from bfcache detected, forcing reload to ensure freshness');
        window.location.reload();
      }
    });

    this.initialized = true;
    this.logger.debug('BfCache protection initialized');
  }
}
