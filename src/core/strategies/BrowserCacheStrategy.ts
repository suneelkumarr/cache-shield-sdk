import { CacheShieldConfig, CacheTypeResult, CacheShieldError } from '../types';
import { Logger } from '../../utils/logger';

export class BrowserCacheStrategy {
  constructor(
    private config: CacheShieldConfig,
    private logger: Logger
  ) {}

  async clearCacheAPI(): Promise<CacheTypeResult> {
    if (!('caches' in window)) {
      return {
        type: 'cacheAPI',
        success: false,
        error: 'Cache API not supported'
      };
    }

    try {
      const cacheNames = await caches.keys();
      let cleared = 0;

      for (const cacheName of cacheNames) {
        if (this.shouldExclude(cacheName)) {
          this.logger.debug(`Skipping cache: ${cacheName}`);
          continue;
        }

        if (this.shouldInclude(cacheName)) {
          await caches.delete(cacheName);
          cleared++;
          this.logger.debug(`Deleted cache: ${cacheName}`);
        }
      }

      return {
        type: 'cacheAPI',
        success: true,
        itemsCleared: cleared
      };
    } catch (error) {
      throw new CacheShieldError(
        'Failed to clear Cache API',
        'UNKNOWN',
        'cacheAPI',
        error instanceof Error ? error : undefined
      );
    }
  }

  async clearCookies(): Promise<CacheTypeResult> {
    try {
      const { cookies: cookieConfig } = this.config;
      const preserveEssential = cookieConfig?.preserveEssential ?? true;
      const essentialCookies = cookieConfig?.essentialCookies || [];
      const targetNames = cookieConfig?.names;
      const targetDomains = cookieConfig?.domains;
      const targetPaths = cookieConfig?.paths || ['/'];

      const allCookies = this.parseCookies();
      let cleared = 0;

      for (const cookie of allCookies) {
        // Check if targeting specific names
        if (targetNames && targetNames.length > 0) {
          if (!targetNames.includes(cookie.name)) {
            continue;
          }
        }

        // Check if essential and should preserve
        if (preserveEssential) {
          const isEssential = essentialCookies.some(essential =>
            cookie.name.toLowerCase().includes(essential.toLowerCase())
          );
          if (isEssential) {
            this.logger.debug(`Preserving essential cookie: ${cookie.name}`);
            continue;
          }
        }

        // Delete cookie
        this.deleteCookie(cookie.name, targetPaths, targetDomains);
        cleared++;
        this.logger.debug(`Deleted cookie: ${cookie.name}`);
      }

      return {
        type: 'cookies',
        success: true,
        itemsCleared: cleared
      };
    } catch (error) {
      throw new CacheShieldError(
        'Failed to clear cookies',
        'UNKNOWN',
        'cookies',
        error instanceof Error ? error : undefined
      );
    }
  }

  private parseCookies(): { name: string; value: string }[] {
    return document.cookie.split(';').map(cookie => {
      const [name, value] = cookie.trim().split('=');
      return { name, value: value || '' };
    }).filter(c => c.name);
  }

  private deleteCookie(
    name: string,
    paths: string[] = ['/'],
    domains?: string[]
  ): void {
    const expiry = 'Thu, 01 Jan 1970 00:00:00 GMT';
    const { cookies: cookieConfig } = this.config;
    
    // Explicit override domain
    if (cookieConfig?.domain) {
      this.deleteCookieWithDomain(name, paths, [cookieConfig.domain], expiry);
      return;
    }
    
    // Try different domain combinations
    const domainsToTry = domains || [
      '', // Current domain
      window.location.hostname,
      '.' + window.location.hostname,
      window.location.hostname.split('.').slice(-2).join('.'), // Root domain (best effort)
      window.location.hostname.split('.').slice(-3).join('.')  // Deeper subdomains
    ];

    this.deleteCookieWithDomain(name, paths, domainsToTry, expiry);
  }

  private deleteCookieWithDomain(name: string, paths: string[], domains: string[], expiry: string): void {
    for (const path of paths) {
      for (const domain of domains) {
        // Skip invalid domain segments
        if (domain && domain.indexOf('.') === -1 && domain !== 'localhost') continue;

        const domainPart = domain ? `; domain=${domain}` : '';
        document.cookie = `${name}=; expires=${expiry}; path=${path}${domainPart}`;
        document.cookie = `${name}=; expires=${expiry}; path=${path}${domainPart}; secure`;
      }
    }
  }

  private shouldExclude(value: string): boolean {
    const { exclude } = this.config;
    if (!exclude || exclude.length === 0) return false;

    return exclude.some(pattern => {
      if (typeof pattern === 'string') return value.includes(pattern);
      return pattern.test(value);
    });
  }

  private shouldInclude(value: string): boolean {
    const { include } = this.config;
    if (!include || include.length === 0) return true;

    return include.some(pattern => {
      if (typeof pattern === 'string') return value.includes(pattern);
      return pattern.test(value);
    });
  }
}