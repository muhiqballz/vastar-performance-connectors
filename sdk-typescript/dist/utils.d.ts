import { HTTPResponse } from './types';
export declare class HTTPResponseHelper {
    static is2xx(response: HTTPResponse): boolean;
    static is3xx(response: HTTPResponse): boolean;
    static is4xx(response: HTTPResponse): boolean;
    static is5xx(response: HTTPResponse): boolean;
    static getBodyAsString(response: HTTPResponse): string;
    static getBodyAsJSON<T = unknown>(response: HTTPResponse): T;
    static getHeader(response: HTTPResponse, name: string): string | undefined;
}
export declare class RetryHelper {
    static withRetry<T>(fn: () => Promise<T>, options?: {
        maxRetries?: number;
        initialBackoffMs?: number;
        maxBackoffMs?: number;
        retryableErrors?: string[];
    }): Promise<T>;
}
export declare function sleep(ms: number): Promise<void>;
export declare class SSEParser {
    static parseStream(sseData: string): string;
    static parseChunk(sseChunk: string): string | null;
    static parseStreamAsync(sseData: string): AsyncGenerator<string, void, unknown>;
}
//# sourceMappingURL=utils.d.ts.map