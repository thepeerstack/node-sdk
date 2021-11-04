const BaseError = require('./BaseError')

module.exports = class InvalidResourceError extends BaseError {
  /**
   * The InvalidResourceError Constructor.
   * @param {Object} options - A configuration object for errors.
   * @param {String} options.message - The error message if any.
   * @constructor InvalidResourceError
   */
  constructor (options = {}) {
    super(options)
    this.name = this.constructor.name
    this.message = options.message
  }
}
