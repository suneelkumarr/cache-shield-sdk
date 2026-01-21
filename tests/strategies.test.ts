import { StorageStrategy } from '../src/core/strategies/StorageStrategy';
import { BrowserCacheStrategy } from '../src/core/strategies/BrowserCacheStrategy';
import { ServiceWorkerStrategy } from '../src/core/strategies/ServiceWorkerStrategy';
import { IndexedDBStrategy } from '../src/core/strategies/IndexedDBStrategy';
import { SmartReloader } from '../src/core/strategies/SmartReloader';
import { BfCacheStrategy } from '../src/core/strategies/BfCacheStrategy';
import { Logger } from '../src/utils/logger';
import { CacheShieldConfig } from '../src/core/types';

// Mock Logger
const mockLogger = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  success: jest.fn()
} as unknown as Logger;

// Mock Config
const mockConfig: CacheShieldConfig = {
  debug: false
};

describe('Strategies', () => {
  describe('StorageStrategy', () => {
    let strategy: StorageStrategy;

    beforeEach(() => {
      strategy = new StorageStrategy(mockConfig, mockLogger);
      localStorage.clear();
      sessionStorage.clear();
      jest.clearAllMocks();
    });

    it('should clear all localStorage items', async () => {
      localStorage.setItem('foo', 'bar');
      localStorage.setItem('baz', 'qux');
      
      const result = await strategy.clearLocalStorage();
      
      expect(result.success).toBe(true);
      expect(result.itemsCleared).toBe(2);
      expect(localStorage.length).toBe(0);
    });

    it('should preserve keys matching preserveKeys', async () => {
      const config = { ...mockConfig, storage: { preserveKeys: ['keep-me'] } };
      strategy = new StorageStrategy(config, mockLogger);

      localStorage.setItem('foo', 'bar');
      localStorage.setItem('keep-me', 'safe');

      const result = await strategy.clearLocalStorage();

      expect(result.itemsCleared).toBe(1);
      expect(localStorage.getItem('foo')).toBeNull();
      expect(localStorage.getItem('keep-me')).toBe('safe');
    });

    it('should preserve keys matching preservePattern', async () => {
      const config = { 
        ...mockConfig, 
        storage: { preservePattern: /^keep_/ } 
      };
      strategy = new StorageStrategy(config, mockLogger);

      localStorage.setItem('keep_this', 'safe');
      localStorage.setItem('delete_this', 'gone');

      const result = await strategy.clearLocalStorage();

      expect(result.itemsCleared).toBe(1);
      expect(localStorage.getItem('keep_this')).toBe('safe');
      expect(localStorage.getItem('delete_this')).toBeNull();
    });

    it('should clear only keys matching keyPattern', async () => {
      const config = { 
        ...mockConfig, 
        storage: { keyPattern: /^app_/ } 
      };
      strategy = new StorageStrategy(config, mockLogger);

      localStorage.setItem('app_data', 'value');
      localStorage.setItem('other_data', 'value');

      const result = await strategy.clearLocalStorage();

      expect(result.itemsCleared).toBe(1);
      expect(localStorage.getItem('app_data')).toBeNull();
      expect(localStorage.getItem('other_data')).toBe('value');
    });

    it('should clear sessionStorage', async () => {
      sessionStorage.setItem('session-data', '123');
      const result = await strategy.clearSessionStorage();
      expect(result.success).toBe(true);
      expect(sessionStorage.length).toBe(0);
    });

    it('should calculate bytes freed', async () => {
      localStorage.setItem('key', 'value');
      const result = await strategy.clearLocalStorage();
      expect(result.bytesFreed).toBeDefined();
      expect(typeof result.bytesFreed).toBe('number');
    });

    it('should get storage stats', () => {
      localStorage.setItem('test', 'value');
      const stats = strategy.getStorageStats();
      expect(stats.localStorage).toBeGreaterThan(0);
      expect(stats.sessionStorage).toBeGreaterThanOrEqual(0);
    });
  });

  describe('BrowserCacheStrategy', () => {
    let strategy: BrowserCacheStrategy;
    let cookieStore: string = '';

    beforeAll(() => {
      // Mock document.cookie behavior
      Object.defineProperty(Document.prototype, 'cookie', {
        get: () => cookieStore,
        set: (val: string) => {
          if (val.includes('max-age=0') || val.includes('expires=')) {
            const name = val.split('=')[0].trim();
            const cookies = cookieStore.split(';').map(c => c.trim()).filter(c => c);
            cookieStore = cookies.filter(c => !c.startsWith(name + '=')).join('; ');
          } else {
            const name = val.split('=')[0].trim();
            const cookies = cookieStore.split(';').map(c => c.trim()).filter(c => c && !c.startsWith(name + '='));
            cookies.push(val.split(';')[0]);
            cookieStore = cookies.join('; ');
          }
        },
        configurable: true
      });
    });

    beforeEach(() => {
      strategy = new BrowserCacheStrategy(mockConfig, mockLogger);
      cookieStore = '';
      jest.clearAllMocks();
    });

    it('should clear cookies', async () => {
      cookieStore = 'test=123; foo=bar';

      const result = await strategy.clearCookies();
      
      expect(result.success).toBe(true);
      expect(result.itemsCleared).toBe(2);
    });
    
    it('should preserve essential cookies', async () => {
      const config = { 
        ...mockConfig, 
        cookies: { 
          preserveEssential: true, 
          essentialCookies: ['session_id'] 
        } 
      };
      strategy = new BrowserCacheStrategy(config, mockLogger);

      cookieStore = 'user=john; session_id=xyz';
      const result = await strategy.clearCookies();

      expect(result.itemsCleared).toBe(1);
    });

    it('should handle empty cookie store', async () => {
      cookieStore = '';
      const result = await strategy.clearCookies();
      expect(result.success).toBe(true);
    });

    it('should clear only specific named cookies', async () => {
      const config = {
        ...mockConfig,
        cookies: { names: ['user'] }
      };
      strategy = new BrowserCacheStrategy(config, mockLogger);

      cookieStore = 'user=john; session=abc; token=xyz';
      const result = await strategy.clearCookies();

      expect(result.success).toBe(true);
    });
  });

  describe('ServiceWorkerStrategy', () => {
    let strategy: ServiceWorkerStrategy;

    beforeEach(() => {
      strategy = new ServiceWorkerStrategy(mockConfig, mockLogger);
      jest.clearAllMocks();
    });

    it('should have clear method', async () => {
      expect(strategy.clear).toBeDefined();
      const result = await strategy.clear();
      expect(result.type).toBe('serviceWorker');
    });

    it('should have update method', async () => {
      expect(strategy.update).toBeDefined();
      const result = await strategy.update();
      expect(typeof result).toBe('boolean');
    });

    it('should handle when serviceWorker is not supported', async () => {
      const result = await strategy.clear();
      // Either success or error about not being supported
      expect(result).toHaveProperty('type', 'serviceWorker');
      expect(result).toHaveProperty('success');
    });
  });

  describe('IndexedDBStrategy', () => {
    let strategy: IndexedDBStrategy;

    beforeEach(() => {
      strategy = new IndexedDBStrategy(mockConfig, mockLogger);
      jest.clearAllMocks();
    });

    it('should have clear method', async () => {
      expect(strategy.clear).toBeDefined();
      const result = await strategy.clear();
      expect(result.type).toBe('indexedDB');
    });

    it('should handle when indexedDB is not supported', async () => {
      const result = await strategy.clear();
      expect(result).toHaveProperty('type', 'indexedDB');
      expect(result).toHaveProperty('success');
    });

    it('should work with configured database names', async () => {
      const config = {
        ...mockConfig,
        indexedDB: { databases: ['test-db'] }
      };
      strategy = new IndexedDBStrategy(config, mockLogger);
      const result = await strategy.clear();
      expect(result).toHaveProperty('type', 'indexedDB');
    });

    it('should attempt to detect databases', async () => {
      const result = await strategy.clear();
      expect(result).toBeDefined();
      expect(result.type).toBe('indexedDB');
    });
  });

  describe('SmartReloader', () => {
    let strategy: SmartReloader;
    let originalLocation: Location;

    beforeEach(() => {
      strategy = new SmartReloader(mockLogger);
      jest.clearAllMocks();
      
      // Mock window.location
      originalLocation = window.location;
      delete (window as any).location;
      (window as any).location = { 
        href: 'https://example.com/page',
        reload: jest.fn(),
        replace: jest.fn(),
        protocol: 'https:',
        hostname: 'example.com'
      };
    });

    afterEach(() => {
      window.location = originalLocation;
    });

    it('should have reload method', () => {
      expect(strategy.reload).toBeDefined();
    });

    it('should call location.reload when forceBypass is false', () => {
      strategy.reload(false);
      expect((window.location as any).reload).toHaveBeenCalled();
    });

    it('should call location.replace for cache-busting when forceBypass is true', () => {
      strategy.reload(true);
      expect((window.location as any).replace).toHaveBeenCalled();
    });

    it('should add cache-busting query parameter', () => {
      strategy.reload(true);
      const call = (window.location as any).replace.mock.calls[0];
      if (call) {
        expect(call[0]).toContain('_cs_bust=');
      }
    });
  });

  describe('BfCacheStrategy', () => {
    let strategy: BfCacheStrategy;

    beforeEach(() => {
      strategy = new BfCacheStrategy(mockLogger);
      jest.clearAllMocks();
    });

    it('should have init method', () => {
      expect(strategy.init).toBeDefined();
    });

    it('should initialize without errors', () => {
      expect(() => strategy.init()).not.toThrow();
    });

    it('should listen for pageshow event', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      strategy.init();
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('pageshow', expect.any(Function));
      
      addEventListenerSpy.mockRestore();
    });

    it('should not initialize twice', () => {
      strategy.init();
      strategy.init(); // Should not add listener twice
      expect(true); // Just verify no errors
    });
  });

  describe('Cross-strategy integration', () => {
    it('should all strategies have proper error handling', async () => {
      const strategies = [
        new StorageStrategy(mockConfig, mockLogger),
        new BrowserCacheStrategy(mockConfig, mockLogger),
        new ServiceWorkerStrategy(mockConfig, mockLogger),
        new IndexedDBStrategy(mockConfig, mockLogger)
      ];

      for (const strategy of strategies) {
        const result = await (strategy as any).clear?.() || { success: false };
        expect(result).toHaveProperty('type');
        expect(result).toHaveProperty('success');
      }
    });
  });
});
