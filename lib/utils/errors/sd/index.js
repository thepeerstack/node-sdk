const crypto = require('crypto');
const ForbiddenError = require('../errors/ForbiddenError');
const InvalidResourceError = require('../errors/InvalidResourceError');
const NotAcceptableError = require('../errors/NotAcceptableError');
const ServerError = require('../errors/ServerError');
const ServiceUnavailableError = require('../errors/ServiceUnavailableError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const InvalidPayloadError = require('../errors/InvalidPayloadError');

/**
 * @class Helper
 */
class Helper {
  /**
   * @static
   * @param {object} payload - The payload to be verified.
   * @param {string} signature - The signature to compare with
   * @returns { Boolean } - True if same signature otherwise false
   * @memberof Helper
   */
  validateSignature(payload, signature) {
    return signature === crypto.createHmac('sha1', this.secretKey).update(payload).digest('hex');
  }

  /**
   *
   * @param {unknown} error - The error object
   * @returns {Object} - The an error instance
   * @memberof Helper
   */
  static processError(error) {
    if (!error instanceof Error) {
      throw new Error(`argument not an instance of error`);
    }

    const errordata = error.response.data.error;
    switch (error.response.status) {
      case 401:
        throw new UnauthorizedError({ message: error.response.data.message });
      case 403:
        throw new ForbiddenError({ message: error.response.data.message });
      case 404:
        throw new InvalidResourceError({ message: error.response.data.message });
      case 406:
        throw new NotAcceptableError({ message: error.response.data.message });
      case 422: Object.keys(errordata).forEach((key) => {
        throw new InvalidPayloadError({ message: errordata[ key ] });
      });
        break;
      case 503:
        throw new ServiceUnavailableError({ message: error.response.data.message });
      default:
        throw new ServerError({ message: error.response.data.message });
    }
  }
}

module.exports = Helper;
