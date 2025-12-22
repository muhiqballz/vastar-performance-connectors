"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditUpdateT = exports.CreditUpdate = void 0;
const flatbuffers = __importStar(require("flatbuffers"));
class CreditUpdate {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsCreditUpdate(bb, obj) {
        return (obj || new CreditUpdate()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsCreditUpdate(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new CreditUpdate()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    creditDelta() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    }
    totalCredits() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
    }
    static startCreditUpdate(builder) {
        builder.startObject(2);
    }
    static addCreditDelta(builder, creditDelta) {
        builder.addFieldInt32(0, creditDelta, 0);
    }
    static addTotalCredits(builder, totalCredits) {
        builder.addFieldInt32(1, totalCredits, 0);
    }
    static endCreditUpdate(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createCreditUpdate(builder, creditDelta, totalCredits) {
        CreditUpdate.startCreditUpdate(builder);
        CreditUpdate.addCreditDelta(builder, creditDelta);
        CreditUpdate.addTotalCredits(builder, totalCredits);
        return CreditUpdate.endCreditUpdate(builder);
    }
    unpack() {
        return new CreditUpdateT(this.creditDelta(), this.totalCredits());
    }
    unpackTo(_o) {
        _o.creditDelta = this.creditDelta();
        _o.totalCredits = this.totalCredits();
    }
}
exports.CreditUpdate = CreditUpdate;
class CreditUpdateT {
    constructor(creditDelta = 0, totalCredits = 0) {
        this.creditDelta = creditDelta;
        this.totalCredits = totalCredits;
    }
    pack(builder) {
        return CreditUpdate.createCreditUpdate(builder, this.creditDelta, this.totalCredits);
    }
}
exports.CreditUpdateT = CreditUpdateT;
//# sourceMappingURL=credit-update.js.map