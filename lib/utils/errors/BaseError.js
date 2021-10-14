/**
 * A custom error class for handling module related errors.
 * @class BaseError
 */
module.exports = class BaseError extends Error {
  /**
   * The BaseError Constructor.
   * @param {Object} options - A configuration object for errors.
   * @param {String} options.message - The error message if any.
   * @constructor BaseError
   */
  constructor (options = {}) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = options.message
  }
}
