export declare class Logger {
    private enabled;
    private prefix;
    constructor(enabled?: boolean);
    debug(message: string, data?: unknown): void;
    info(message: string, data?: unknown): void;
    warn(message: string, data?: unknown): void;
    error(message: string, data?: unknown): void;
    success(message: string, data?: unknown): void;
    private log;
}
