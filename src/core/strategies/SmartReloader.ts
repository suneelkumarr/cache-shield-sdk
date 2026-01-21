import { Logger } from '../../utils/logger';

export class SmartReloader {
  constructor(private logger: Logger) {}

  /**
   * Reload the page with cache-busting logic
   */
  reload(forceBypass: boolean = true): void {
    if (forceBypass) {
      this.performCacheBustedReload();
    } else {
      this.logger.debug('Performing standard reload');
      window.location.reload();
    }
  }

  private performCacheBustedReload(): void {
    this.logger.debug('Performing smart cache-busting reload');
    
    try {
      const url = new URL(window.location.href);
      // Add unique timestamp to force browser to fetch fresh HTML
      url.searchParams.set('_cs_bust', Date.now().toString());
      
      // Use replace() to avoid breaking the back button history
      window.location.replace(url.toString());
    } catch (error) {
      // Fallback for older browsers or URL parsing errors
      this.logger.warn('Smart reload failed, falling back to standard reload', error);
      window.location.reload();
    }
  }
}
