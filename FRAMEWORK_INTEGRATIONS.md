# Framework Integrations

Cache Shield SDK provides first-class integrations for all major JavaScript frameworks. Each integration is designed to follow the framework's conventions and best practices while providing the full power of Cache Shield's cache clearing capabilities.

## Available Frameworks

### React
**Import:** `import { CacheShieldProvider, useCacheShield } from 'cache-shield-sdk/react'`

**Features:**
- React Context for global state management
- Custom hooks for functional components
- Pre-built components (ClearCacheButton)
- Full TypeScript support
- Error boundaries compatible

**Usage:**
```tsx
import { CacheShieldProvider, useCacheShield, ClearCacheButton } from 'cache-shield-sdk/react';

function App() {
  return (
    <CacheShieldProvider>
      <MyComponent />
    </CacheShieldProvider>
  );
}

function MyComponent() {
  const { clear, isClearing, lastResult } = useCacheShield();

  return (
    <div>
      <ClearCacheButton onSuccess={(result) => console.log(result)}>
        Clear Cache
      </ClearCacheButton>
    </div>
  );
}
```

### Vue 3
**Import:** `import { createCacheShield, CacheShieldPlugin } from 'cache-shield-sdk/vue'`

**Features:**
- Vue 3 Composition API
- Plugin system for global installation
- Options API compatibility
- Reactive state management
- Component mixins

**Usage:**
```vue
<script setup>
import { useCacheShield } from 'cache-shield-sdk/vue';

const { clear, isClearing, lastResult } = useCacheShield();
</script>

<template>
  <button @click="clear" :disabled="isClearing">
    {{ isClearing ? 'Clearing...' : 'Clear Cache' }}
  </button>
</template>
```

### Angular
**Import:** `import { CacheShieldService, CacheShieldModule } from 'cache-shield-sdk/angular'`

**Features:**
- Angular dependency injection
- Service-based architecture
- Module system integration
- RxJS observables (future)
- Component library

**Usage:**
```typescript
import { CacheShieldModule } from 'cache-shield-sdk/angular';

@NgModule({
  imports: [CacheShieldModule]
})
export class AppModule {}

@Component({
  template: `
    <cache-shield-button
      text="Clear Cache"
      (success)="onSuccess($event)">
    </cache-shield-button>
  `
})
export class MyComponent {
  constructor(private cacheShield: CacheShieldService) {}

  async clearCache() {
    const result = await this.cacheShield.clear();
  }
}
```

### Svelte
**Import:** `import { createCacheShieldStore, useCacheShield } from 'cache-shield-sdk/svelte'`

**Features:**
- Svelte stores for reactive state
- Context API integration
- Action functions
- Component composition
- SvelteKit compatible

**Usage:**
```svelte
<script>
  import { useCacheShield } from 'cache-shield-sdk/svelte';

  const { clear, isClearing, lastResult } = useCacheShield();
</script>

<button on:click={clear} disabled={$isClearing}>
  {$isClearing ? 'Clearing...' : 'Clear Cache'}
</button>
```

### SolidJS
**Import:** `import { CacheShieldProvider, useCacheShield } from 'cache-shield-sdk/solid'`

**Features:**
- Solid signals for reactive state
- Context API
- Fine-grained reactivity
- JSX components
- Server-side rendering compatible

**Usage:**
```tsx
import { CacheShieldProvider, useCacheShield, ClearCacheButton } from 'cache-shield-sdk/solid';

function App() {
  return (
    <CacheShieldProvider>
      <MyComponent />
    </CacheShieldProvider>
  );
}

function MyComponent() {
  const { clear, isClearing } = useCacheShield();

  return (
    <ClearCacheButton>
      Clear Cache
    </ClearCacheButton>
  );
}
```

### Preact
**Import:** `import { CacheShieldProvider, useCacheShield } from 'cache-shield-sdk/preact'`

**Features:**
- Preact hooks and context
- Lightweight components
- React compatibility layer
- Same API as React integration
- Tree-shaking friendly

**Usage:**
```jsx
import { CacheShieldProvider, useCacheShield } from 'cache-shield-sdk/preact';
import { h } from 'preact';

function App() {
  return h(CacheShieldProvider, {}, h(MyComponent));
}

function MyComponent() {
  const { clear, isClearing } = useCacheShield();

  return h('button', {
    onClick: clear,
    disabled: isClearing
  }, isClearing ? 'Clearing...' : 'Clear Cache');
}
```

### Lit
**Import:** `import { CacheShieldButton, CacheShieldService } from 'cache-shield-sdk/lit'`

**Features:**
- Web Components standard
- Reactive properties
- Declarative templates
- Framework agnostic
- Custom element registry

**Usage:**
```typescript
import { CacheShieldButton, CacheShieldService } from 'cache-shield-sdk/lit';

// Register components
customElements.define('cache-shield-button', CacheShieldButton);

class MyElement extends LitElement {
  private cacheShield = new CacheShieldService();

  render() {
    return html`
      <cache-shield-button
        text="Clear Cache"
        @cache-cleared=${this.onCleared}>
      </cache-shield-button>
    `;
  }
}
```

### Alpine.js
**Import:** `import { cacheShieldData, cacheShieldDirective } from 'cache-shield-sdk/alpine'`

**Features:**
- Alpine data functions
- Custom directives
- x-data patterns
- Event-driven architecture
- CDN friendly

**Usage:**
```html
<div x-data="cacheShieldData()">
  <button @click="clear()" :disabled="isClearing">
    <span x-show="!isClearing">Clear Cache</span>
    <span x-show="isClearing">Clearing...</span>
  </button>

  <div x-show="lastResult">
    <pre x-text="JSON.stringify(lastResult, null, 2)"></pre>
  </div>
</div>
```

### Qwik
**Import:** `import { CacheShieldProvider, useCacheShield } from 'cache-shield-sdk/qwik'`

**Features:**
- Resumable components
- QRL functions for lazy loading
- Server-side rendering
- Progressive enhancement
- Zero hydration overhead

**Usage:**
```tsx
import { CacheShieldProvider, useCacheShield, ClearCacheButton } from 'cache-shield-sdk/qwik';

export default component$(() => {
  return (
    <CacheShieldProvider>
      <MyComponent />
    </CacheShieldProvider>
  );
});

export const MyComponent = component$(() => {
  const { clear, isClearing } = useCacheShield();

  return (
    <button onClick$={clear} disabled={isClearing}>
      {isClearing ? 'Clearing...' : 'Clear Cache'}
    </button>
  );
});
```

## Common Patterns

### Provider Pattern
Most frameworks support a provider pattern for global state management:

```javascript
// React/Vue/Angular/Solid/Preact/Qwik
<Provider config={config}>
  <App />
</Provider>
```

### Hook/Composable Pattern
Functional components use hooks or composables:

```javascript
// React/Solid/Preact/Qwik
const { clear, isClearing } = useCacheShield();

// Vue
const { clear, isClearing } = useCacheShield();

// Svelte
const { clear, isClearing } = useCacheShield();

// Alpine
x-data="cacheShieldData()"
```

### Service Pattern
Class-based frameworks use services:

```javascript
// Angular
constructor(private cacheShield: CacheShieldService) {}

// Lit
private cacheShield = new CacheShieldService();
```

## Configuration

All frameworks accept the same configuration options:

```javascript
const config = {
  targets: ['localStorage', 'sessionStorage', 'cookies'],
  debug: true,
  hooks: {
    onBeforeClear: () => console.log('Starting...'),
    onAfterClear: (result) => console.log('Done:', result)
  }
};
```

## Error Handling

All integrations provide consistent error handling:

```javascript
// Success callback
<ClearCacheButton onSuccess={(result) => console.log(result)} />

// Error callback
<ClearCacheButton onError={(error) => console.error(error)} />

// Async/await with try/catch
try {
  const result = await clear();
} catch (error) {
  console.error('Clear failed:', error);
}
```

## TypeScript Support

All integrations are fully typed:

```typescript
import type { CacheShieldConfig, ClearResult } from 'cache-shield-sdk';

interface Props {
  config?: CacheShieldConfig;
  onSuccess?: (result: ClearResult) => void;
}
```

## Bundle Size

Framework-specific imports keep bundles small:

```javascript
// Only imports React integration (~5KB)
import { useCacheShield } from 'cache-shield-sdk/react';

// Core functionality only (~10KB)
import { CacheShield } from 'cache-shield-sdk';
```

## Migration Guide

### From Vanilla JS
```javascript
// Before
import { CacheShield } from 'cache-shield-sdk';
const shield = new CacheShield();

// After (React)
import { useCacheShield } from 'cache-shield-sdk/react';
const { clear } = useCacheShield();
```

### Between Frameworks
```javascript
// React to Vue
// React: const { clear } = useCacheShield();
// Vue: const { clear } = useCacheShield();

// React to Svelte
// React: const [isClearing, setIsClearing] = useState(false);
// Svelte: $: isClearing = writable(false);
```

## Best Practices

1. **Provider at Root**: Install providers at the app root for global access
2. **Error Boundaries**: Wrap cache operations in error boundaries
3. **Loading States**: Always show loading states during clear operations
4. **Confirmation**: Ask for user confirmation before clearing important data
5. **Selective Clearing**: Use specific targets instead of clearing everything
6. **Logging**: Enable debug logging in development
7. **Testing**: Test cache clearing in staging environments first

## Browser Support

All framework integrations support the same browsers as Cache Shield SDK:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

Framework integrations follow these principles:

1. **Framework Conventions**: Follow each framework's best practices
2. **Consistent API**: Same configuration and result formats
3. **TypeScript First**: Full type safety
4. **Tree Shaking**: Support for dead code elimination
5. **Documentation**: Comprehensive examples and API docs
6. **Testing**: Framework-specific test suites

To add a new framework integration:

1. Create `src/[framework].ts`
2. Implement provider/hook/service patterns
3. Add to `rollup.config.js`
4. Update `package.json` exports
5. Add peer dependencies
6. Write comprehensive tests
7. Update documentation</content>
<parameter name="filePath">d:\cache-shield-sdk\FRAMEWORK_INTEGRATIONS.md