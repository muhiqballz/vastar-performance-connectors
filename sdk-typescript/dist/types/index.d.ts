export declare enum ErrorClass {
    Success = 0,
    Transient = 1,
    Permanent = 2,
    RateLimited = 3,
    Timeout = 4,
    InvalidRequest = 5
}
export interface HTTPRequestConfig {
    method: string;
    url: string;
    headers?: Record<string, string>;
    body?: string | Buffer;
    timeoutMs?: number;
    tenantId?: string;
    workspaceId?: string;
    traceId?: string;
}
export interface HTTPResponse {
    status: any;
    requestId: number;
    statusCode: number;
    headers: Record<string, string>;
    body: Buffer;
    durationUs: number;
    errorClass: ErrorClass;
    errorMessage?: string;
}
export interface RuntimeClientConfig {
    tenantId?: string;
    workspaceId?: string;
    timeoutMs?: number;
    socketPath?: string;
    useTcp?: boolean;
    tcpHost?: string;
    tcpPort?: number;
}
export interface ConnectionOptions {
    socketPath: string;
    timeout: number;
}
export declare enum MessageType {
    ExecuteRequest = 0,
    ExecuteResponse = 1
}
export declare const PROTOCOL_CONSTANTS: {
    readonly FRAME_LENGTH_SIZE: 4;
    readonly MESSAGE_TYPE_SIZE: 1;
    readonly MAX_PAYLOAD_SIZE: number;
    readonly DEFAULT_TIMEOUT_MS: 60000;
    readonly DEFAULT_SOCKET_PATH: "/tmp/vastar-connector-runtime.sock";
    readonly DEFAULT_TCP_HOST: "127.0.0.1";
    readonly DEFAULT_TCP_PORT: 5000;
};
//# sourceMappingURL=index.d.ts.map