import { StorageStrategy } from '../src/core/strategies/StorageStrategy';
import { BrowserCacheStrategy } from '../src/core/strategies/BrowserCacheStrategy';
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

    it('should clear sessionStorage', async () => {
      sessionStorage.setItem('session-data', '123');
      const result = await strategy.clearSessionStorage();
      expect(result.success).toBe(true);
      expect(sessionStorage.length).toBe(0);
    });
  });

  describe('BrowserCacheStrategy', () => {
    let strategy: BrowserCacheStrategy;
    let cookieStore: string = '';

    beforeAll(() => {
      // Mock document.cookie behavior using the prototype
      Object.defineProperty(Document.prototype, 'cookie', {
        get: () => cookieStore,
        set: (val: string) => {
          // Simple mock: if it contains expires or max-age=0, remove it
          if (val.includes('max-age=0') || val.includes('expires=')) {
            const name = val.split('=')[0].trim();
            const cookies = cookieStore.split(';').map(c => c.trim()).filter(c => c);
            cookieStore = cookies.filter(c => !c.startsWith(name + '=')).join('; ');
          } else {
            // Append or update
            const name = val.split('=')[0].trim();
            const cookies = cookieStore.split(';').map(c => c.trim()).filter(c => c && !c.startsWith(name + '='));
            cookies.push(val.split(';')[0]); // Take just the name=value part
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
      expect(cookieStore).toBe('');
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
      
      // Spy on deleteCookie (private method)
      const deleteSpy = jest.spyOn(strategy as any, 'deleteCookie');

      const result = await strategy.clearCookies();

      expect(result.itemsCleared).toBe(1); // Only 'user' should be cleared
      expect(cookieStore).toContain('session_id=xyz');
      expect(cookieStore).not.toContain('user=john');
      expect(deleteSpy).toHaveBeenCalledWith('user', expect.any(Array), undefined);
    });
  });
});
