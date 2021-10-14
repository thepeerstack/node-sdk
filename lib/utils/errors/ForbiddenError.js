const BaseError = require('./BaseError')

module.exports = class ForbiddenError extends BaseError {
  /**
   * The ForbiddenError Constructor.
   * @param {Object} options - A configuration object for errors.
   * @param {String} options.message - The error message if any.
   * @constructor ForbiddenError
   */
  constructor (options = {}) {
    super(options)
    this.name = this.constructor.name
    this.message = options.message
  }
}
