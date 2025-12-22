"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["ExecuteRequest"] = 0] = "ExecuteRequest";
    MessageType[MessageType["ExecuteResponse"] = 1] = "ExecuteResponse";
    MessageType[MessageType["HealthCheck"] = 2] = "HealthCheck";
    MessageType[MessageType["HealthResponse"] = 3] = "HealthResponse";
    MessageType[MessageType["CreditUpdate"] = 4] = "CreditUpdate";
})(MessageType || (exports.MessageType = MessageType = {}));
//# sourceMappingURL=message-type.js.map