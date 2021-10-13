const axios = require('axios').default

/**
 * @class ThePeer
 */
class ThePeer {
  /**
   *This is a constructor for creating a Peer Instance
   * @param {*} options - contains the required properties for creating a new instance
   * @returns { ThePeer } - An instance of thePeer
   */
  constructor (options) {
    this.secretKey = options.secretkey
    this.client = axios.create({
      baseURL: 'https://api.thepeer.co',
      timeout: 3000,
      headers: {
        'x-api-key': options.secretkey,
        'Content-Type': 'application/json'
      }
    })
  }
}
module.exports = ThePeer
