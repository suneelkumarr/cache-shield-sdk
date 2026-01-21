# Vue Example

This directory contains example code for using CacheShield with Vue 3.

## Usage

1. Install the plugin in your main application entry point.
2. Use the `useCacheShield` composable in your components.

## Setup

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { createCacheShield } from 'cache-shield-sdk/vue';

const app = createApp(App);

app.use(createCacheShield({
  debug: true,
  hooks: {
    onAfterClear: () => console.log('Cache cleared!')
  }
}));

app.mount('#app');
```

## Component Usage

See `CacheManager.vue` for a complete example of using the composable.
