"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorException = void 0;
const types_1 = require("./types");
class ConnectorException extends Error {
    constructor(message, errorClass, requestId) {
        super(message);
        this.name = 'ConnectorException';
        this.errorClass = errorClass;
        this.requestId = requestId;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ConnectorException);
        }
    }
    isRetryable() {
        return (this.errorClass === types_1.ErrorClass.Transient ||
            this.errorClass === types_1.ErrorClass.RateLimited ||
            this.errorClass === types_1.ErrorClass.Timeout);
    }
    getErrorClassName() {
        return types_1.ErrorClass[this.errorClass];
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            errorClass: this.getErrorClassName(),
            requestId: this.requestId,
            stack: this.stack,
        };
    }
}
exports.ConnectorException = ConnectorException;
//# sourceMappingURL=errors.js.map