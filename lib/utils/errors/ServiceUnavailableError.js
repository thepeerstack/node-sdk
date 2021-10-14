const BaseError = require('./BaseError')

module.exports = class ServiceUnavailableError extends BaseError {
  /**
   * The ServiceUnavailableError Constructor.
   * @param {Object} options - A configuration object for errors.
   * @param {String} options.message - The error message if any.
   * @constructor ServiceUnavailableError
   */
  constructor (options = {}) {
    super(options)
    this.name = this.constructor.name
    this.message = options.message
  }
}
