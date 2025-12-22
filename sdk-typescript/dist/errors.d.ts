import { ErrorClass } from './types';
export declare class ConnectorException extends Error {
    readonly requestId: number;
    readonly errorClass: ErrorClass;
    constructor(message: string, errorClass: ErrorClass, requestId: number);
    isRetryable(): boolean;
    getErrorClassName(): string;
    toJSON(): Record<string, unknown>;
}
//# sourceMappingURL=errors.d.ts.map