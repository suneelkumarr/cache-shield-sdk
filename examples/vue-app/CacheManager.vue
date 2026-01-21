<template>
  <div class="cache-manager">
    <h2>Vue Cache Controls</h2>

    <div class="status-panel">
      <div v-if="isClearing" class="loader">Clearing cache...</div>
      <div v-else class="ready">System Ready</div>
    </div>

    <div class="capabilities">
      <h3>Detected Capabilities</h3>
      <ul>
        <li v-for="(enabled, cap) in capabilities" :key="cap">
          {{ cap }}: {{ enabled ? 'Yes' : 'No' }}
        </li>
      </ul>
    </div>

    <div class="actions">
      <button 
        @click="handleClearAll" 
        :disabled="isClearing"
        class="primary-btn"
      >
        Clear Everything
      </button>

      <button 
        @click="clearStorageOnly" 
        :disabled="isClearing"
        class="secondary-btn"
      >
        Clear Storage Only
      </button>
    </div>

    <div v-if="lastResult" class="result">
      <h4>Last Operation Result:</h4>
      <pre>{{ JSON.stringify(lastResult, null, 2) }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCacheShield } from 'cache-shield-sdk/vue';

export default defineComponent({
  name: 'CacheManager',
  setup() {
    const { 
      clear, 
      isClearing, 
      capabilities, 
      lastResult 
    } = useCacheShield();

    const handleClearAll = async () => {
      try {
        await clear();
        console.log('All cleared!');
      } catch (err) {
        console.error('Failed to clear', err);
      }
    };

    const clearStorageOnly = async () => {
      await clear({
        targets: ['localStorage', 'sessionStorage']
      });
    };

    return {
      isClearing,
      capabilities,
      lastResult,
      handleClearAll,
      clearStorageOnly
    };
  }
});
</script>

<style scoped>
.cache-manager {
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
}

.actions {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
}

button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.primary-btn {
  background-color: #42b883; /* Vue Green */
  color: white;
}

.secondary-btn {
  background-color: #35495e; /* Vue Dark */
  color: white;
}
</style>
