import React from 'react';
import { useCacheShield, ClearCacheButton } from 'cache-shield-sdk/react';

export function CacheManagerExample() {
  const { clear, isClearing, capabilities } = useCacheShield();

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Cache Shield React Demo</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>System Capabilities:</strong>
        <ul>
          {Object.entries(capabilities).map(([key, value]) => (
            <li key={key}>
              {key}: {value ? '✅' : '❌'}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => clear()} 
          disabled={isClearing}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isClearing ? 'not-allowed' : 'pointer'
          }}
        >
          {isClearing ? 'Working...' : 'Clear All Cache'}
        </button>

        <ClearCacheButton
          options={{ targets: ['cookies'] }}
          className="custom-btn"
          onSuccess={() => alert('Cookies gone!')}
        >
          Clear Cookies Only
        </ClearCacheButton>
      </div>
    </div>
  );
}
