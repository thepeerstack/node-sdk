export default class BaseError extends Error {
    constructor({ message, stack }: Partial<Error>);
}
export declare class ForbiddenError extends BaseError {
}
export declare class InvalidPayloadError extends BaseError {
}
export declare class InvalidResourceError extends BaseError {
}
export declare class UnauthorizedError extends BaseError {
}
export declare class ServiceUnavailableError extends BaseError {
}
export declare class ServerError extends BaseError {
}
export declare class NotAcceptableError extends BaseError {
}
