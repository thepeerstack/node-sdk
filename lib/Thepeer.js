const axios = require('axios').default
const crypto = require('crypto')
const Helper = require('./utils/Helper')

/**
 * @class ThePeer
 */
class ThePeer {
  /**
   *This is a constructor for creating a Peer Instance
   * @param {string} secretkey - Thepeer secret key
   * @returns { ThePeer } - An instance of thePeer
   */
  constructor (secretkey) {
    this.secretKey = secretkey
    this.request = axios.create({
      baseURL: 'https://api.thepeer.co',
      headers: {
        'x-api-key': secretkey,
        'Content-Type': 'application/json'
      }
    })
  }

  /**
   * @static
   * @param {object} payload - The payload to be verified.
   * @param {string} signature - The signature to compare with
   * @returns { Boolean } - True if same signature otherwise false
   * @memberof ThePeer
   */
  validateSignature (payload, signature) {
    return signature === crypto.createHmac('sha1', this.secretKey).update(payload).digest('hex')
  }

  /**
   * @param {object} payload - The user payload.
   * @param {string} payload.name - The name of the user
   * @param {string} payload.identifier - The identifier of the user
   * @param {string} payload.email - The email of the user
   * @returns {JSON}  A JSON response containing the details of the user
   * @memberof ThePeer
   */
  async indexUser (payload) {
    try {
      const response = await this.request.post('/users', {
        name: payload.name,
        identifier: payload.identifier,
        email: payload.email
      })

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * @param {string} reference - The reference returned when the user was indexed
   * @param {string} identifier - The identifier of the user
   * @returns {JSON}  A JSON response containing the details of the user
   * @memberof ThePeer
   */
  async updateUser (reference, identifier) {
    try {
      const response = await this.request.put(`/users/${reference}`, {
        identifier: identifier
      })

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * @param {string} reference - The reference returned when the user was indexed
   * @returns {JSON}  A JSON response containing the details of the user
   * @memberof ThePeer
   */
  async deleteUser (reference) {
    try {
      const response = await this.request.delete(`/users/${reference}`)

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * @param {string} reference - The reference returned when the user was indexed
   * @returns {JSON}  A JSON response containing the details of the user
   * @memberof ThePeer
   */
  async getUser (reference) {
    try {
      const response = await this.request.get(`/users/${reference}`)

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   *
   * @param {string} linkid - The id of a user linked account
   * @returns {JSON} A JSON response containing the details of the user
   * @memberof ThePeer
   */
  async getLink (linkid) {
    try {
      const response = await this.request.get(`/link/${linkid}`)

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * A function that charges your user's linked account at any time
   * @param {string} linkid - The id of the link
   * @param {integer} amount - amount in kobo
   * @param {string} remark - The reason for initiating a direct charge
   * @returns {JSON} A JSON response containing the details of the user
   * @memberof ThePeer
   */
  async chargeLink (linkid, amount, remark) {
    try {
      const response = await this.request.post(`/link/${linkid}/charge`, {
        amount: amount,
        remark: remark
      })

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * Authorize direct charge request via webhooks
   * @param {*} reference - The direct charge reference sent via webhook
   * @param {string} event - Event type (success, insufficient_funds)
   * @returns {JSON} A JSON response containing the details of the user
   * @memberof ThePeer
   */
  async authorizeDirectCharge (reference, event) {
    try {
      const response = await this.request.post(`/debit/${reference}`, {
        event: event
      })

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * @memberof ThePeer
   * @param {string} receipt - The reference returned to your receiptURL via the Chain SDK
   * @param {string} event - Event type (success, insufficient_funds)
   * @returns {JSON} A JSON response containing the details of the user
   */
  async processSendReceipt (receipt, event) {
    try {
      const response = await this.request.post(`/send/${receipt}`, {
        event: event
      })

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }

  /**
   * @memberof ThePeer
   * @param {string} receipt - The reference returned to your receiptURL via the Chain SDK
   * @returns {JSON} A JSON response containing the details of the user
   */
  async getSendReceipt (receipt) {
    try {
      const response = await this.request.get(`/send/${receipt}`)

      return response.data
    } catch (e) {
      Helper.processError(e)
    }
  }
}

module.exports = ThePeer
