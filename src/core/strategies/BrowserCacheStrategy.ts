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
    
    // Auto-detect domains using improved heuristic
    const domainsToTry = domains || this.getDomainsToTry();
    this.deleteCookieWithDomain(name, paths, domainsToTry, expiry);
  }

  private getDomainsToTry(): string[] {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    const domains: string[] = [''];
    
    // Always try the exact hostname
    if (hostname) {
      domains.push(hostname);
      domains.push('.' + hostname);
    }

    // Try parent domains (from most specific to least)
    if (parts.length >= 2) {
      // Try 2-part domain (example.com)
      const twoPartDomain = parts.slice(-2).join('.');
      if (twoPartDomain !== hostname) {
        domains.push(twoPartDomain);
        domains.push('.' + twoPartDomain);
      }
    }

    if (parts.length >= 3) {
      // Try 3-part domain (for .co.uk, .gov.au patterns)
      const threePartDomain = parts.slice(-3).join('.');
      if (threePartDomain !== hostname && 
          !domains.includes(threePartDomain) &&
          threePartDomain.split('.').length >= 2) {
        domains.push(threePartDomain);
        domains.push('.' + threePartDomain);
      }
    }

    // Remove duplicates and invalid entries
    return [...new Set(domains)].filter(d => {
      // Allow empty string (current domain) and valid domain strings
      return d === '' || d === 'localhost' || /^\.?[a-zA-Z0-9][-a-zA-Z0-9]*(\.[a-zA-Z0-9][-a-zA-Z0-9]*)+$/.test(d);
    });
  }

  private deleteCookieWithDomain(name: string, paths: string[], domains: string[], expiry: string): void {
    for (const path of paths) {
      for (const domain of domains) {
        // Skip invalid domain segments
        if (domain && domain.indexOf('.') === -1 && domain !== 'localhost') continue;

        const domainPart = domain ? `; domain=${domain}` : '';
        
        // Standard cookie deletion
        document.cookie = `${name}=; expires=${expiry}; path=${path}${domainPart}`;
        
        // Also try secure flag for HTTPS
        document.cookie = `${name}=; expires=${expiry}; path=${path}${domainPart}; secure`;
        
        // Log deletion attempts for debugging
        this.logger.debug(`Attempted to delete cookie "${name}"`, { 
          domain: domain || '(current)', 
          path,
          timestamp: new Date().toISOString()
        });
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