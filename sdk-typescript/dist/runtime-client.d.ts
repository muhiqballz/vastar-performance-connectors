import { RuntimeClientConfig, HTTPRequestConfig, HTTPResponse } from './types';
export declare class RuntimeClient {
    private socket;
    private readonly config;
    private requestIdSeq;
    private pendingRequests;
    constructor(config?: RuntimeClientConfig);
    connect(): Promise<void>;
    executeHTTP(request: HTTPRequestConfig): Promise<HTTPResponse>;
    private sendFrame;
    private receiveBuffer;
    private handleData;
    private processFrame;
    private waitForResponse;
    private handleError;
    private handleClose;
    close(): Promise<void>;
}
//# sourceMappingURL=runtime-client.d.ts.map