import * as flatbuffers from 'flatbuffers';
export declare class CreditUpdate {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): CreditUpdate;
    static getRootAsCreditUpdate(bb: flatbuffers.ByteBuffer, obj?: CreditUpdate): CreditUpdate;
    static getSizePrefixedRootAsCreditUpdate(bb: flatbuffers.ByteBuffer, obj?: CreditUpdate): CreditUpdate;
    creditDelta(): number;
    totalCredits(): number;
    static startCreditUpdate(builder: flatbuffers.Builder): void;
    static addCreditDelta(builder: flatbuffers.Builder, creditDelta: number): void;
    static addTotalCredits(builder: flatbuffers.Builder, totalCredits: number): void;
    static endCreditUpdate(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createCreditUpdate(builder: flatbuffers.Builder, creditDelta: number, totalCredits: number): flatbuffers.Offset;
    unpack(): CreditUpdateT;
    unpackTo(_o: CreditUpdateT): void;
}
export declare class CreditUpdateT {
    creditDelta: number;
    totalCredits: number;
    constructor(creditDelta?: number, totalCredits?: number);
    pack(builder: flatbuffers.Builder): flatbuffers.Offset;
}
//# sourceMappingURL=credit-update.d.ts.map