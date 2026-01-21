import { CacheShield } from '../src/index';

describe('CacheShield', () => {
  it('should instantiate without errors', () => {
    const shield = new CacheShield();
    expect(shield).toBeDefined();
  });

  it('should accept configuration options', () => {
    const shield = new CacheShield({ debug: true });
    expect(shield).toBeDefined();
  });
});
