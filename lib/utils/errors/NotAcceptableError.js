const BaseError = require('./BaseError')

module.exports = class NotAcceptableError extends BaseError {
  /**
   * The NotAcceptableError Constructor.
   * @param {Object} options - A configuration object for errors.
   * @param {String} options.message - The error message if any.
   * @constructor NotAcceptableError
   */
  constructor (options = {}) {
    super(options)
    this.name = this.constructor.name
    this.message = options.message
  }
}
