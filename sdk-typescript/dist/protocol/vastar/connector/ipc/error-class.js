"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorClass = void 0;
var ErrorClass;
(function (ErrorClass) {
    ErrorClass[ErrorClass["Success"] = 0] = "Success";
    ErrorClass[ErrorClass["Transient"] = 1] = "Transient";
    ErrorClass[ErrorClass["Permanent"] = 2] = "Permanent";
    ErrorClass[ErrorClass["RateLimited"] = 3] = "RateLimited";
    ErrorClass[ErrorClass["Timeout"] = 4] = "Timeout";
    ErrorClass[ErrorClass["InvalidRequest"] = 5] = "InvalidRequest";
})(ErrorClass || (exports.ErrorClass = ErrorClass = {}));
//# sourceMappingURL=error-class.js.map