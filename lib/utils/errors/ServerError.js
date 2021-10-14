const BaseError = require('./BaseError')

module.exports = class ServerErrorError extends BaseError {
  /**
   * The ServerErrorError Constructor.
   * @param {Object} options - A configuration object for errors.
   * @param {String} options.message - The error message if any.
   * @constructor ServerErrorError
   */
  constructor (options = {}) {
    super(options)
    this.name = this.constructor.name
    this.message = options.message
  }
}
