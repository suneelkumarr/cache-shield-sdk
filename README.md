# 🛡️ Cache Shield SDK

> Clear browser caches from client-side with ease. Service Workers, Storage, IndexedDB, Cookies & more.

[![npm version](https://badge.fury.io/js/cache-shield-sdk.svg)](https://www.npmjs.com/package/cache-shield-sdk)
[![bundle size](https://img.shields.io/bundlephobia/minzip/cache-shield-sdk)](https://bundlephobia.com/package/cache-shield-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- 🧹 **Clear All Cache Types** - Service Workers, Cache API, localStorage, sessionStorage, IndexedDB, Cookies
- ⚡ **Lightweight** - ~4KB gzipped, zero dependencies
- 🎯 **Selective Clearing** - Target specific caches, preserve essential data
- 🔌 **Framework Plugins** - First-class React & Vue support
- 📦 **TypeScript** - Full type definitions included
- 🌐 **Universal** - Works in any browser environment

## 📦 Installation

```bash
npm install cache-shield-sdk
# or
yarn add cache-shield-sdk
# or
pnpm add cache-shield-sdk
```

## 📂 Examples

Check out the `examples` directory for complete working demos:

- **[Basic](examples/basic)** - Vanilla JS implementation
- **[React](examples/react-app)** - React Hook & Component usage
- **[Vue 3](examples/vue-app)** - Vue Composable & Plugin usage

## 🚀 Quick Start

### Basic Usage

```javascript
import CacheShield from 'cache-shield-sdk';

// Create instance
const shield = new CacheShield();

// Clear all caches
await shield.clear();

// Clear specific types
await shield.clearServiceWorkers();
await shield.clearLocalStorage();
await shield.clearCookies();
```

### One-liner

```javascript
import { clearCache } from 'cache-shield-sdk';

await clearCache(); // Clears everything!
```

### With Options

```javascript
const shield = new CacheShield({
  targets: ['localStorage', 'sessionStorage', 'cookies'],
  cookies: {
    preserveEssential: true,
    essentialCookies: ['auth_token', 'csrf']
  },
  storage: {
    preserveKeys: ['user_preferences']
  },
  debug: true,
  autoReload: true
});

const result = await shield.clear();
console.log(`Cleared ${result.cleared.length} cache types`);
```

## ⚛️ React

```tsx
import { CacheShieldProvider, useCacheShield, ClearCacheButton } from 'cache-shield-sdk/react';

// Wrap your app
function App() {
  return (
    <CacheShieldProvider config={{ debug: true }}>
      <MyComponent />
    </CacheShieldProvider>
  );
}

// Use the hook
function MyComponent() {
  const { clear, isClearing, lastResult } = useCacheShield();

  return (
    <div>
      <button onClick={() => clear()} disabled={isClearing}>
        {isClearing ? 'Clearing...' : 'Clear Cache'}
      </button>
      
      {/* Or use the built-in button */}
      <ClearCacheButton onSuccess={(result) => console.log(result)} />
    </div>
  );
}
```

## 💚 Vue 3

```typescript
// main.ts
import { createApp } from 'vue';
import { CacheShieldPlugin } from 'cache-shield-sdk/vue';

const app = createApp(App);
app.use(CacheShieldPlugin, { debug: true });
app.mount('#app');

// Component
<script setup>
import { useCacheShield } from 'cache-shield-sdk/vue';

const { clear, isClearing, capabilities } = useCacheShield();
</script>

<template>
  <button @click="clear()" :disabled="isClearing">
    {{ isClearing ? 'Clearing...' : 'Clear Cache' }}
  </button>
</template>
```

## 🌐 CDN / Browser

```html
<script src="https://unpkg.com/cache-shield-sdk"></script>
<script>
  const shield = new CacheShield.default();
  shield.clear().then(result => {
    console.log('Cache cleared!', result);
  });
</script>
```

## 📋 API Reference

### `CacheShield`

#### Constructor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `targets` | `CacheType[]` | `['all']` | Cache types to clear |
| `include` | `(string \| RegExp)[]` | `[]` | Only clear matching patterns |
| `exclude` | `(string \| RegExp)[]` | `[]` | Skip matching patterns |
| `cookies` | `CookieOptions` | `{}` | Cookie-specific options |
| `storage` | `StorageOptions` | `{}` | Storage-specific options |
| `indexedDB` | `IndexedDBOptions` | `{}` | IndexedDB-specific options |
| `debug` | `boolean` | `false` | Enable debug logging |
| `autoReload` | `boolean` | `false` | Reload after clearing |
| `hooks` | `CacheShieldHooks` | `{}` | Lifecycle callbacks |

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `clear(options?)` | `Promise<ClearResult>` | Clear all targeted caches |
| `clearServiceWorkers()` | `Promise<CacheTypeResult>` | Clear only Service Workers |
| `clearCacheAPI()` | `Promise<CacheTypeResult>` | Clear only Cache API |
| `clearLocalStorage()` | `Promise<CacheTypeResult>` | Clear only localStorage |
| `clearSessionStorage()` | `Promise<CacheTypeResult>` | Clear only sessionStorage |
| `clearIndexedDB()` | `Promise<CacheTypeResult>` | Clear only IndexedDB |
| `clearCookies()` | `Promise<CacheTypeResult>` | Clear only cookies |
| `hardReload()` | `void` | Force reload bypassing cache |
| `clearAndReload(options?)` | `Promise<void>` | Clear then reload |
| `getStorageEstimate()` | `Promise<StorageEstimate>` | Get storage usage |
| `getCapabilities()` | `Capabilities` | Check browser support |

### Types

```typescript
type CacheType = 
  | 'all'
  | 'serviceWorker'
  | 'cacheAPI'
  | 'localStorage'
  | 'sessionStorage'
  | 'indexedDB'
  | 'cookies';

interface ClearResult {
  success: boolean;
  cleared: CacheTypeResult[];
  failed: CacheTypeResult[];
  timestamp: number;
  duration: number;
}
```

## 🎯 Common Use Cases

### PWA Update Handler

```javascript
const shield = new CacheShield({
  targets: ['serviceWorker', 'cacheAPI'],
  hooks: {
    onAfterClear: () => {
      // Show "New version available" toast
      showUpdateNotification();
    }
  }
});

// When user clicks "Update"
await shield.clearAndReload();
```

### Logout Cleanup

```javascript
async function logout() {
  await shield.clear({
    targets: ['localStorage', 'sessionStorage', 'cookies', 'indexedDB'],
    cookies: {
      preserveEssential: false // Clear everything including auth
    }
  });
  
  window.location.href = '/login';
}
```

### Debug Mode

```javascript
const shield = new CacheShield({
  debug: true,
  hooks: {
    onProgress: ({ current, percentage }) => {
      console.log(`Clearing ${current}: ${percentage}%`);
    }
  }
});
```

## 📊 Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Service Workers | ✅ 40+ | ✅ 44+ | ✅ 11.1+ | ✅ 17+ |
| Cache API | ✅ 40+ | ✅ 39+ | ✅ 11.1+ | ✅ 16+ |
| localStorage | ✅ All | ✅ All | ✅ All | ✅ All |
| IndexedDB | ✅ 23+ | ✅ 10+ | ✅ 10+ | ✅ 12+ |

## 📄 License

MIT Suneel Kumar