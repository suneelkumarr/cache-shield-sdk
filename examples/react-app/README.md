# React Example

This directory contains example code for using CacheShield with React.

## Usage

1. Wrap your application (or part of it) with `CacheShieldProvider`.
2. Use the `useCacheShield` hook to access functionality.

## Setup

```tsx
// src/App.tsx
import React from 'react';
import { CacheShieldProvider } from 'cache-shield-sdk/react';
import { CacheManager } from './CacheManager';

const config = {
  debug: true,
  autoReload: false
};

export default function App() {
  return (
    <CacheShieldProvider config={config}>
      <div className="app">
        <h1>My App</h1>
        <CacheManager />
      </div>
    </CacheShieldProvider>
  );
}
```

```tsx
// src/CacheManager.tsx
import React from 'react';
import { useCacheShield, ClearCacheButton } from 'cache-shield-sdk/react';

export function CacheManager() {
  const { clear, isClearing, lastResult } = useCacheShield();

  const handleClearAll = async () => {
    await clear();
    alert('Cache cleared!');
  };

  return (
    <div className="cache-controls">
      <h2>Cache Controls</h2>
      
      <div className="status">
        {isClearing ? 'Clearing...' : 'Ready'}
      </div>

      <div className="actions">
        {/* Method 1: Use the hook directly */}
        <button onClick={handleClearAll} disabled={isClearing}>
          Clear All Manually
        </button>

        {/* Method 2: Use the provided button component */}
        <ClearCacheButton 
          options={{ targets: ['localStorage'] }}
          onSuccess={() => console.log('LocalStorage cleared')}
        >
          Clear LocalStorage
        </ClearCacheButton>
      </div>

      {lastResult && (
        <pre>{JSON.stringify(lastResult, null, 2)}</pre>
      )}
    </div>
  );
}
```
