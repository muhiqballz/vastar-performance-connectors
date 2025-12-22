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
exports.HealthCheckResponseT = exports.HealthCheckResponse = void 0;
const flatbuffers = __importStar(require("flatbuffers"));
class HealthCheckResponse {
    constructor() {
        this.bb = null;
        this.bb_pos = 0;
    }
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsHealthCheckResponse(bb, obj) {
        return (obj || new HealthCheckResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsHealthCheckResponse(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new HealthCheckResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    healthy() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
    }
    message(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    }
    activeRequests() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
    }
    availableCredits() {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
    }
    static startHealthCheckResponse(builder) {
        builder.startObject(4);
    }
    static addHealthy(builder, healthy) {
        builder.addFieldInt8(0, +healthy, +false);
    }
    static addMessage(builder, messageOffset) {
        builder.addFieldOffset(1, messageOffset, 0);
    }
    static addActiveRequests(builder, activeRequests) {
        builder.addFieldInt32(2, activeRequests, 0);
    }
    static addAvailableCredits(builder, availableCredits) {
        builder.addFieldInt32(3, availableCredits, 0);
    }
    static endHealthCheckResponse(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createHealthCheckResponse(builder, healthy, messageOffset, activeRequests, availableCredits) {
        HealthCheckResponse.startHealthCheckResponse(builder);
        HealthCheckResponse.addHealthy(builder, healthy);
        HealthCheckResponse.addMessage(builder, messageOffset);
        HealthCheckResponse.addActiveRequests(builder, activeRequests);
        HealthCheckResponse.addAvailableCredits(builder, availableCredits);
        return HealthCheckResponse.endHealthCheckResponse(builder);
    }
    unpack() {
        return new HealthCheckResponseT(this.healthy(), this.message(), this.activeRequests(), this.availableCredits());
    }
    unpackTo(_o) {
        _o.healthy = this.healthy();
        _o.message = this.message();
        _o.activeRequests = this.activeRequests();
        _o.availableCredits = this.availableCredits();
    }
}
exports.HealthCheckResponse = HealthCheckResponse;
class HealthCheckResponseT {
    constructor(healthy = false, message = null, activeRequests = 0, availableCredits = 0) {
        this.healthy = healthy;
        this.message = message;
        this.activeRequests = activeRequests;
        this.availableCredits = availableCredits;
    }
    pack(builder) {
        const message = (this.message !== null ? builder.createString(this.message) : 0);
        return HealthCheckResponse.createHealthCheckResponse(builder, this.healthy, message, this.activeRequests, this.availableCredits);
    }
}
exports.HealthCheckResponseT = HealthCheckResponseT;
//# sourceMappingURL=health-check-response.js.map