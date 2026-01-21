type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'success';

export class Logger {
  private prefix = '[CacheShield]';
  
  constructor(private enabled: boolean = false) {}

  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  error(message: string, data?: unknown): void {
    this.log('error', message, data);
  }

  success(message: string, data?: unknown): void {
    this.log('success', message, data);
  }

  private log(level: LogLevel, message: string, data?: unknown): void {
    if (!this.enabled && level === 'debug') {
      return;
    }

    const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

    if (!isBrowser) {
       // Simple text logging for Node/CI
       const consoleMethod = level === 'error' ? 'error' : 
                            level === 'warn' ? 'warn' : 
                            'log';
       console[consoleMethod](`[${level.toUpperCase()}] ${this.prefix} ${message}`, data !== undefined ? data : '');
       return;
    }

    const styles = {
      debug: 'color: #888',
      info: 'color: #2196F3',
      warn: 'color: #FF9800',
      error: 'color: #F44336',
      success: 'color: #4CAF50'
    };

    const emoji = {
      debug: '🔍',
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌',
      success: '✅'
    };

    const consoleMethod = level === 'error' ? 'error' : 
                          level === 'warn' ? 'warn' : 
                          'log';

    console[consoleMethod](
      `%c${emoji[level]} ${this.prefix} ${message}`,
      styles[level],
      data !== undefined ? data : ''
    );
  }
}