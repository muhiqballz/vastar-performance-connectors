import * as flatbuffers from 'flatbuffers';
import { ErrorClass } from '../../../vastar/connector/ipc/error-class';
export declare class ExecuteResponse {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): ExecuteResponse;
    static getRootAsExecuteResponse(bb: flatbuffers.ByteBuffer, obj?: ExecuteResponse): ExecuteResponse;
    static getSizePrefixedRootAsExecuteResponse(bb: flatbuffers.ByteBuffer, obj?: ExecuteResponse): ExecuteResponse;
    requestId(): bigint;
    errorClass(): ErrorClass;
    errorMessage(): string | null;
    errorMessage(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    payload(index: number): number | null;
    payloadLength(): number;
    payloadArray(): Uint8Array | null;
    durationUs(): bigint;
    static startExecuteResponse(builder: flatbuffers.Builder): void;
    static addRequestId(builder: flatbuffers.Builder, requestId: bigint): void;
    static addErrorClass(builder: flatbuffers.Builder, errorClass: ErrorClass): void;
    static addErrorMessage(builder: flatbuffers.Builder, errorMessageOffset: flatbuffers.Offset): void;
    static addPayload(builder: flatbuffers.Builder, payloadOffset: flatbuffers.Offset): void;
    static createPayloadVector(builder: flatbuffers.Builder, data: number[] | Uint8Array): flatbuffers.Offset;
    static startPayloadVector(builder: flatbuffers.Builder, numElems: number): void;
    static addDurationUs(builder: flatbuffers.Builder, durationUs: bigint): void;
    static endExecuteResponse(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createExecuteResponse(builder: flatbuffers.Builder, requestId: bigint, errorClass: ErrorClass, errorMessageOffset: flatbuffers.Offset, payloadOffset: flatbuffers.Offset, durationUs: bigint): flatbuffers.Offset;
    unpack(): ExecuteResponseT;
    unpackTo(_o: ExecuteResponseT): void;
}
export declare class ExecuteResponseT {
    requestId: bigint;
    errorClass: ErrorClass;
    errorMessage: string | Uint8Array | null;
    payload: (number)[];
    durationUs: bigint;
    constructor(requestId?: bigint, errorClass?: ErrorClass, errorMessage?: string | Uint8Array | null, payload?: (number)[], durationUs?: bigint);
    pack(builder: flatbuffers.Builder): flatbuffers.Offset;
}
//# sourceMappingURL=execute-response.d.ts.map