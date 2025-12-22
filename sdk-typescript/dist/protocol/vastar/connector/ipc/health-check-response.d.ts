import * as flatbuffers from 'flatbuffers';
export declare class HealthCheckResponse {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): HealthCheckResponse;
    static getRootAsHealthCheckResponse(bb: flatbuffers.ByteBuffer, obj?: HealthCheckResponse): HealthCheckResponse;
    static getSizePrefixedRootAsHealthCheckResponse(bb: flatbuffers.ByteBuffer, obj?: HealthCheckResponse): HealthCheckResponse;
    healthy(): boolean;
    message(): string | null;
    message(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    activeRequests(): number;
    availableCredits(): number;
    static startHealthCheckResponse(builder: flatbuffers.Builder): void;
    static addHealthy(builder: flatbuffers.Builder, healthy: boolean): void;
    static addMessage(builder: flatbuffers.Builder, messageOffset: flatbuffers.Offset): void;
    static addActiveRequests(builder: flatbuffers.Builder, activeRequests: number): void;
    static addAvailableCredits(builder: flatbuffers.Builder, availableCredits: number): void;
    static endHealthCheckResponse(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createHealthCheckResponse(builder: flatbuffers.Builder, healthy: boolean, messageOffset: flatbuffers.Offset, activeRequests: number, availableCredits: number): flatbuffers.Offset;
    unpack(): HealthCheckResponseT;
    unpackTo(_o: HealthCheckResponseT): void;
}
export declare class HealthCheckResponseT {
    healthy: boolean;
    message: string | Uint8Array | null;
    activeRequests: number;
    availableCredits: number;
    constructor(healthy?: boolean, message?: string | Uint8Array | null, activeRequests?: number, availableCredits?: number);
    pack(builder: flatbuffers.Builder): flatbuffers.Offset;
}
//# sourceMappingURL=health-check-response.d.ts.map