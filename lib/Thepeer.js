const axios = require('axios').default;
const crypto = require('crypto');
const Helper = require('./utils/Helper');

class ThePeer {
  constructor(secretkey) {
    this.secretKey = secretkey;
    this.request = axios.create({
      baseURL: 'https://api.thepeer.co',
      headers: {
        'x-api-key': secretkey,
        'Content-Type': 'application/json'
      }
    });
  }

  validateSignature(payload, signature) {
    return signature === crypto.createHmac('sha1', this.secretKey).update(payload).digest('hex');
  }

  async indexUser(name, identifier, email) {
    try {
      const response = await this.request.post('/users', {
        name: name,
        identifier: identifier,
        email: email
      });

      return response.data;
    } catch (e) {
      Helper.processError(e);
    }
  }

  async updateUser(reference, identifier) {
    try {
      const response = await this.request.put(`/users/${reference}`, {
        identifier: identifier
      });

      return response.data;
    } catch (e) {
      Helper.processError(e);
    }
  }

  async deleteUser(reference) {
    try {
      const response = await this.request.delete(`/users/${reference}`);

      return response.data;
    } catch (e) {
      Helper.processError(e);
    }
  }

  async getUser(reference) {
    try {
      const response = await this.request.get(`/users/${reference}`);

      return response.data;
    } catch (e) {
      Helper.processError(e);
    }
  }

  async getLink(linkid) {
    try {
      const response = await this.request.get(`/link/${linkid}`);

      return response.data;
    } catch (e) {
      Helper.processError(e);
    }
  }

  async chargeLink(linkid, amount, remark) {
    try {
      const response = await this.request.post(`/link/${linkid}/charge`, {
        amount: amount,
        remark: remark
      });

      return response.data;
    } catch (e) {
      Helper.processError(e);
    }
  }

  async authorizeDirectCharge(reference, event) {
    try {
      const response = await this.request.post(`/debit/${reference}`, {
        event: event
      });

      return response.data;
    } catch (e) {
      Helper.processError(e);
    }
  }

  async processSendReceipt(receipt, event) {
    try {
      const response = await this.request.post(`/send/${receipt}`, {
        event: event
      });

      return response.data;
    } catch (e) {
      Helper.processError(e);
    }
  }

  async getSendReceipt(receipt) {
    try {
      const response = await this.request.get(`/send/${receipt}`);

      return response.data;
    } catch (e) {
      Helper.processError(e);
    }
  }
}

module.exports = ThePeer;
