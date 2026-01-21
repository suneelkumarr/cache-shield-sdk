import { Logger } from '../../utils/logger';

export class BfCacheStrategy {
  private initialized = false;
  private handler: ((event: PageTransitionEvent) => void) | null = null;

  constructor(private logger: Logger) {}

  /**
   * Initialize listener for Back-Forward Cache restores
   */
  init(): void {
    if (this.initialized || typeof window === 'undefined') return;

    this.handler = (event: PageTransitionEvent) => {
      // event.persisted is true if page was restored from bfcache (memory)
      if (event.persisted) {
        this.logger.info('Page restored from bfcache detected, forcing reload to ensure freshness');
        window.location.reload();
      }
    };

    window.addEventListener('pageshow', this.handler);

    this.initialized = true;
    this.logger.debug('BfCache protection initialized');
  }

  /**
   * Cleanup listeners
   */
  destroy(): void {
    if (this.handler) {
      window.removeEventListener('pageshow', this.handler);
      this.handler = null;
      this.initialized = false;
      this.logger.debug('BfCache protection destroyed');
    }
  }
}
