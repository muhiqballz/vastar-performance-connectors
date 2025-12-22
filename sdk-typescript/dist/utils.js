"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSEParser = exports.RetryHelper = exports.HTTPResponseHelper = void 0;
exports.sleep = sleep;
class HTTPResponseHelper {
    static is2xx(response) {
        return response.statusCode >= 200 && response.statusCode < 300;
    }
    static is3xx(response) {
        return response.statusCode >= 300 && response.statusCode < 400;
    }
    static is4xx(response) {
        return response.statusCode >= 400 && response.statusCode < 500;
    }
    static is5xx(response) {
        return response.statusCode >= 500 && response.statusCode < 600;
    }
    static getBodyAsString(response) {
        return response.body.toString('utf-8');
    }
    static getBodyAsJSON(response) {
        const str = this.getBodyAsString(response);
        return JSON.parse(str);
    }
    static getHeader(response, name) {
        const lowerName = name.toLowerCase();
        for (const [key, value] of Object.entries(response.headers)) {
            if (key.toLowerCase() === lowerName) {
                return value;
            }
        }
        return undefined;
    }
}
exports.HTTPResponseHelper = HTTPResponseHelper;
class RetryHelper {
    static async withRetry(fn, options = {}) {
        const { maxRetries = 3, initialBackoffMs = 1000, maxBackoffMs = 30000, retryableErrors = ['Transient', 'RateLimited', 'Timeout'], } = options;
        let lastError = null;
        let backoffMs = initialBackoffMs;
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                return await fn();
            }
            catch (err) {
                lastError = err;
                const errorStr = err.toString();
                const isRetryable = retryableErrors.some((errorType) => errorStr.includes(errorType));
                if (!isRetryable || attempt === maxRetries) {
                    throw err;
                }
                console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${backoffMs}ms`);
                await sleep(backoffMs);
                backoffMs = Math.min(backoffMs * 2, maxBackoffMs);
            }
        }
        throw lastError;
    }
}
exports.RetryHelper = RetryHelper;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
class SSEParser {
    static parseStream(sseData) {
        const chunks = sseData.split('\n\n');
        let fullContent = '';
        for (const chunk of chunks) {
            if (!chunk.startsWith('data: ')) {
                continue;
            }
            const content = this.parseChunk(chunk);
            if (content) {
                fullContent += content;
            }
        }
        return fullContent;
    }
    static parseChunk(sseChunk) {
        const json = sseChunk.substring(6);
        if (json.trim() === '[DONE]') {
            return null;
        }
        try {
            const data = JSON.parse(json);
            const choices = data.choices;
            if (choices && choices.length > 0) {
                const delta = choices[0].delta;
                if (delta && delta.content) {
                    return delta.content;
                }
            }
        }
        catch (err) {
        }
        return null;
    }
    static async *parseStreamAsync(sseData) {
        const chunks = sseData.split('\n\n');
        for (const chunk of chunks) {
            if (!chunk.startsWith('data: ')) {
                continue;
            }
            const content = this.parseChunk(chunk);
            if (content) {
                yield content;
            }
        }
    }
}
exports.SSEParser = SSEParser;
//# sourceMappingURL=utils.js.map