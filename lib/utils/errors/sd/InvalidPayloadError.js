const BaseError = require('./BaseError')

module.exports = class InvalidPayloadError extends BaseError {
  /**
   * The InvalidPayloadError Constructor.
   * @param {Object} options - A configuration object for errors.
   * @param {String} options.message - The error message if any.
   * @constructor InvalidPayloadError
   */
  constructor (options = {}) {
    super(options)
    this.name = this.constructor.name
    this.message = options.message
  }
}
