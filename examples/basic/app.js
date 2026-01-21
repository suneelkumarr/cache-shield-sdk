// Initialize CacheShield
// Note: In UMD, the library is exposed as 'CacheShield' global
const shield = new CacheShield.default({
    debug: true,
    hooks: {
        onBeforeClear: (targets) => log(`Starting to clear: ${targets.join(', ')}`),
        onAfterClear: (result) => log(`Finished! Success: ${result.success}`),
        onError: (err) => log(`Error: ${err.message}`)
    }
});

function log(message) {
    const logs = document.getElementById('logs');
    const timestamp = new Date().toLocaleTimeString();
    logs.innerHTML = `[${timestamp}] ${message}\n` + logs.innerHTML;
}

function updateStatus() {
    const status = document.getElementById('status');
    const capabilities = shield.getCapabilities();
    status.innerHTML = `
        <strong>Capabilities:</strong><br>
        localStorage: ${capabilities.localStorage ? '✅' : '❌'}<br>
        sessionStorage: ${capabilities.sessionStorage ? '✅' : '❌'}<br>
        cookies: ${capabilities.cookies ? '✅' : '❌'}<br>
        indexedDB: ${capabilities.indexedDB ? '✅' : '❌'}
    `;
}

// Data creation helpers
function createData(type) {
    try {
        switch(type) {
            case 'localStorage':
                localStorage.setItem('demo_data', 'This is some test data ' + Date.now());
                log('Created localStorage data');
                break;
            case 'sessionStorage':
                sessionStorage.setItem('demo_session', 'Session data ' + Date.now());
                log('Created sessionStorage data');
                break;
            case 'cookies':
                document.cookie = `demo_cookie=value_${Date.now()}; path=/`;
                log('Created test cookie');
                break;
        }
    } catch (e) {
        log(`Error creating data: ${e.message}`);
    }
}

// Clear cache handler
async function clearCache(type) {
    try {
        const options = type === 'all' ? {} : { targets: [type] };
        await shield.clear(options);
    } catch (e) {
        log(`Error clearing cache: ${e.message}`);
    }
}

// Init
updateStatus();
log('CacheShield initialized');
