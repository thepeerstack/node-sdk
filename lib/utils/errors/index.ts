export default class BaseError extends Error {
  constructor({ message, stack }: Partial<Error>) {
    super(message);
    this.stack = stack;
    this.name = this.constructor.name;
    this.message = message ?? 'an error occurred';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ForbiddenError extends BaseError { }
export class InvalidPayloadError extends BaseError { }
export class InvalidResourceError extends BaseError { }
export class UnauthorizedError extends BaseError { }
export class ServiceUnavailableError extends BaseError { }
export class ServerError extends BaseError { }
export class NotAcceptableError extends BaseError { }