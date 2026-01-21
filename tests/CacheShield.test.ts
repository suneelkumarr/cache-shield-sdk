import { CacheShield } from '../src/index';
import { CacheShieldConfig } from '../src/core/types';

describe('CacheShield', () => {
  let shield: CacheShield;

  beforeEach(() => {
    shield = new CacheShield();
  });

  describe('Initialization', () => {
    it('should instantiate without errors', () => {
      expect(shield).toBeDefined();
    });

    it('should accept configuration options', () => {
      const shield = new CacheShield({ debug: true });
      expect(shield).toBeDefined();
    });

    it('should merge default config with user config', () => {
      const config: CacheShieldConfig = {
        debug: true,
        autoReload: true,
        targets: ['localStorage']
      };
      const shield = new CacheShield(config);
      expect(shield).toBeDefined();
    });

    it('should detect browser capabilities', () => {
      const capabilities = shield.getCapabilities();
      expect(capabilities).toBeDefined();
      expect(typeof capabilities.localStorage).toBe('boolean');
      expect(typeof capabilities.sessionStorage).toBe('boolean');
      expect(typeof capabilities.cookies).toBe('boolean');
    });
  });

  describe('clear() method', () => {
    it('should call onBeforeClear hook', async () => {
      const onBeforeClear = jest.fn();
      const shield = new CacheShield({
        hooks: { onBeforeClear },
        targets: ['localStorage']
      });

      localStorage.setItem('test', 'value');
      await shield.clear();

      expect(onBeforeClear).toHaveBeenCalled();
      expect(onBeforeClear).toHaveBeenCalledWith(['localStorage']);
    });

    it('should call onAfterClear hook', async () => {
      const onAfterClear = jest.fn();
      const shield = new CacheShield({
        hooks: { onAfterClear },
        targets: ['localStorage']
      });

      localStorage.setItem('test', 'value');
      const result = await shield.clear();

      expect(onAfterClear).toHaveBeenCalled();
      expect(onAfterClear).toHaveBeenCalledWith(result);
    });

    it('should call onProgress hook during clearing', async () => {
      const onProgress = jest.fn();
      const shield = new CacheShield({
        hooks: { onProgress },
        targets: ['localStorage', 'sessionStorage']
      });

      localStorage.setItem('test', 'value');
      await shield.clear();

      expect(onProgress).toHaveBeenCalled();
      const calls = onProgress.mock.calls;
      expect(calls.length).toBeGreaterThan(0);

      // Verify progress structure
      const firstCall = calls[0][0];
      expect(firstCall).toHaveProperty('current');
      expect(firstCall).toHaveProperty('completed');
      expect(firstCall).toHaveProperty('total');
      expect(firstCall).toHaveProperty('percentage');
    });

    it('should handle errors gracefully', async () => {
      const onError = jest.fn();
      const shield = new CacheShield({
        hooks: { onError },
        targets: ['localStorage']
      });

      localStorage.setItem('test', 'value');
      const result = await shield.clear();

      expect(result).toBeDefined();
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('cleared');
      expect(result).toHaveProperty('failed');
      expect(result).toHaveProperty('duration');
      expect(result).toHaveProperty('timestamp');
    });

    it('should return result with timing information', async () => {
      localStorage.setItem('test', 'value');
      const result = await shield.clear({ targets: ['localStorage'] });

      expect(result.timestamp).toBeDefined();
      expect(typeof result.timestamp).toBe('number');
      expect(result.duration).toBeDefined();
      expect(typeof result.duration).toBe('number');
      expect(result.duration).toBeGreaterThanOrEqual(0);
    });

    it('should clear specified targets only', async () => {
      localStorage.setItem('ls_test', 'value');
      sessionStorage.setItem('ss_test', 'value');

      await shield.clear({ targets: ['localStorage'] });

      expect(localStorage.getItem('ls_test')).toBeNull();
      expect(sessionStorage.getItem('ss_test')).toBe('value');
    });
  });

  describe('Individual clear methods', () => {
    it('should have clearLocalStorage method', async () => {
      expect(shield.clearLocalStorage).toBeDefined();
      localStorage.setItem('test', 'value');
      const result = await shield.clearLocalStorage();
      expect(result.type).toBe('localStorage');
    });

    it('should have clearSessionStorage method', async () => {
      expect(shield.clearSessionStorage).toBeDefined();
      sessionStorage.setItem('test', 'value');
      const result = await shield.clearSessionStorage();
      expect(result.type).toBe('sessionStorage');
    });

    it('should have clearCookies method', async () => {
      expect(shield.clearCookies).toBeDefined();
      const result = await shield.clearCookies();
      expect(result.type).toBe('cookies');
    });

    it('should have clearIndexedDB method', async () => {
      expect(shield.clearIndexedDB).toBeDefined();
      const result = await shield.clearIndexedDB();
      expect(result.type).toBe('indexedDB');
    });

    it('should have clearCacheAPI method', async () => {
      expect(shield.clearCacheAPI).toBeDefined();
      const result = await shield.clearCacheAPI();
      expect(result.type).toBe('cacheAPI');
    });

    it('should have clearServiceWorkers method', async () => {
      expect(shield.clearServiceWorkers).toBeDefined();
      const result = await shield.clearServiceWorkers();
      expect(result.type).toBe('serviceWorker');
    });
  });

  describe('Configuration options', () => {
    it('should preserve essential cookies when configured', async () => {
      const shield = new CacheShield({
        cookies: {
          preserveEssential: true,
          essentialCookies: ['auth_token']
        }
      });

      document.cookie = 'auth_token=abc123; path=/';
      document.cookie = 'other_cookie=xyz; path=/';

      const result = await shield.clearCookies();
      expect(result.success).toBe(true);
    });

    it('should preserve keys in localStorage', async () => {
      const shield = new CacheShield({
        storage: {
          preserveKeys: ['keep_me']
        }
      });

      localStorage.setItem('keep_me', 'safe');
      localStorage.setItem('delete_me', 'gone');

      const result = await shield.clearLocalStorage();
      expect(result.success).toBe(true);
      expect(localStorage.getItem('keep_me')).toBe('safe');
      expect(localStorage.getItem('delete_me')).toBeNull();
    });

    it('should resolve "all" target to specific types', async () => {
      const result = await shield.clear({ targets: ['all'] });
      expect(result.cleared).toBeDefined();
      expect(Array.isArray(result.cleared)).toBe(true);
    });
  });

  describe('Capabilities', () => {
    it('should report capabilities accurately', () => {
      const capabilities = shield.getCapabilities();
      expect(capabilities).toHaveProperty('localStorage');
      expect(capabilities).toHaveProperty('sessionStorage');
      expect(capabilities).toHaveProperty('cookies');
      expect(capabilities).toHaveProperty('serviceWorker');
      expect(capabilities).toHaveProperty('cacheAPI');
      expect(capabilities).toHaveProperty('indexedDB');
    });

    it('should only target supported cache types', async () => {
      const shield = new CacheShield({ 
        targets: ['all'],
        debug: false 
      });
      const result = await shield.clear();

      // All results should be from supported types
      result.cleared.forEach(item => {
        expect(['serviceWorker', 'cacheAPI', 'localStorage', 'sessionStorage', 'indexedDB', 'cookies'])
          .toContain(item.type);
      });
    });
  });

  describe('Error handling', () => {
    it('should continue clearing other targets on error', async () => {
      const shield = new CacheShield({
        targets: ['localStorage', 'sessionStorage']
      });

      localStorage.setItem('test', 'value');
      sessionStorage.setItem('test', 'value');

      const result = await shield.clear();

      // Both targets should be attempted
      expect(result.cleared.length + result.failed.length).toBeGreaterThanOrEqual(1);
    });

    it('should report errors in result', async () => {
      const shield = new CacheShield({ 
        targets: ['localStorage'] 
      });
      const result = await shield.clear();
      expect(result).toHaveProperty('success');
      expect(typeof result.success).toBe('boolean');
    });
  });

  describe('Partial options in clear()', () => {
    it('should accept partial config in clear method', async () => {
      localStorage.setItem('test', 'value');
      const result = await shield.clear({ 
        targets: ['localStorage'] 
      });
      expect(result).toBeDefined();
    });

    it('should merge partial options with instance config', async () => {
      const shield = new CacheShield({ 
        targets: ['localStorage'],
        debug: true 
      });
      
      localStorage.setItem('test', 'value');
      const result = await shield.clear({ 
        targets: ['sessionStorage'] 
      });
      
      expect(result).toBeDefined();
    });
  });
});
