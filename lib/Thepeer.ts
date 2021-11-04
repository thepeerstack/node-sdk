import crypto from 'crypto';
import Helper from './utils/Helper';
import axios, { AxiosInstance } from "axios";
import { IndexedUser, DeleteResponse, User, Link, Transaction, RequestConfig } from './types';

export class Thepeer {
  private request: AxiosInstance;

  constructor(private secretKey: string) {
    const baseURL = 'https://api.thepeer.co';

    this.request = axios.create({
      baseURL, headers: {
        'x-api-key': this.secretKey,
        'Content-Type': 'application/json'
      }
    });
  }

  validateSignature(payload: Buffer, signature: string) {
    return signature === crypto.createHmac('sha1', this.secretKey).update(
      payload
    ).digest('hex');
  }

  private async dispatchRequest<ReturnType = unknown>(config: RequestConfig) {
    try {

      return this.request[config.requestType || 'get']<ReturnType>(
        config.endpoint, config.payload,
      );

    } catch (error) {
      Helper.processError(
        error
      );
    }
  }

  async indexUser(name: string, identifier: string, email: string) {

    return (
      await this.dispatchRequest<{ indexed_user: IndexedUser; }>({
        requestType: 'post',
        endpoint: '/users',
        payload: { name, identifier, email }
      })
    )?.data;

  }

  async updateUser(reference: string, identifier: string) {

    return (
      await this.dispatchRequest<{ indexed_user: IndexedUser; }>({
        requestType: 'put',
        endpoint: `/users/${reference}`,
        payload: { identifier }
      })
    )?.data;

  }

  async deleteUser(reference: string) {

    return (
      await this.dispatchRequest<DeleteResponse>({
        requestType: 'delete',
        endpoint: `/users/${reference}`
      })
    )?.data;

  }

  async getUser(reference: string) {

    return (
      await this.dispatchRequest<{ user: User; }>({
        endpoint: `/users/${reference}`
      })
    )?.data;

  }

  async getLink(linkId: string) {

    return (
      await this.dispatchRequest<{ link: Link; }>({
        endpoint: `/link/${linkId}`
      })
    )?.data;

  }

  async chargeLink(linkId: string, amount: number, remark: string) {

    return (
      await this.dispatchRequest<{ transaction: Transaction; }>({
        requestType: 'post',
        endpoint: `/link/${linkId}/charge`,
        payload: {
          amount, remark
        }
      })
    )?.data;

  }

  async authorizeDirectCharge(reference: string, insufficientFunds: boolean) {

    return (
      await this.dispatchRequest<{ transaction: Transaction; }>({
        requestType: 'post',
        endpoint: `/debit/${reference}`,
        payload: {
          insufficient_funds: insufficientFunds
        }
      })
    )?.data;

  }

  async processSendReceipt(receipt: string, insufficientFunds: boolean) {

    return (
      await this.dispatchRequest<{ transaction: Required<Transaction>; }>({
        requestType: 'post',
        endpoint: `/send/${receipt}`,
        payload: {
          insufficient_funds: insufficientFunds
        }
      })
    )?.data;

  }

  async getSendReceipt(receipt: string) {

    return (
      await this.dispatchRequest<{ transaction: Required<Transaction>; }>({
        endpoint: `/send/${receipt}`
      })
    )?.data;
  }

}
