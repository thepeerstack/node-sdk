const BaseError = require('./BaseError')

module.exports = class UnauthorizedError extends BaseError {
  /**
   * The UnauthorizedError Constructor.
   * @param {Object} options - A configuration object for errors.
   * @param {String} options.message - The error message if any.
   * @constructor UnauthorizedError
   */
  constructor (options = {}) {
    super(options)
    this.name = this.constructor.name
    this.message = options.message
  }
}
