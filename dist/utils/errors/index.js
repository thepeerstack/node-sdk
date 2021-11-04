"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAcceptableError = exports.ServerError = exports.ServiceUnavailableError = exports.UnauthorizedError = exports.InvalidResourceError = exports.InvalidPayloadError = exports.ForbiddenError = void 0;
class BaseError extends Error {
    constructor({ message, stack }) {
        super(message);
        this.stack = stack;
        this.name = this.constructor.name;
        this.message = message !== null && message !== void 0 ? message : 'an error occurred';
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = BaseError;
class ForbiddenError extends BaseError {
}
exports.ForbiddenError = ForbiddenError;
class InvalidPayloadError extends BaseError {
}
exports.InvalidPayloadError = InvalidPayloadError;
class InvalidResourceError extends BaseError {
}
exports.InvalidResourceError = InvalidResourceError;
class UnauthorizedError extends BaseError {
}
exports.UnauthorizedError = UnauthorizedError;
class ServiceUnavailableError extends BaseError {
}
exports.ServiceUnavailableError = ServiceUnavailableError;
class ServerError extends BaseError {
}
exports.ServerError = ServerError;
class NotAcceptableError extends BaseError {
}
exports.NotAcceptableError = NotAcceptableError;
