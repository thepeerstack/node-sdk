"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thepeer = void 0;
const crypto_1 = __importDefault(require("crypto"));
const Helper_1 = __importDefault(require("./utils/Helper"));
const axios_1 = __importDefault(require("axios"));
class Thepeer {
    constructor(secretKey) {
        this.secretKey = secretKey;
        const baseURL = 'https://api.thepeer.co';
        this.request = axios_1.default.create({
            baseURL, headers: {
                'x-api-key': this.secretKey,
                'Content-Type': 'application/json'
            }
        });
    }
    validateSignature(payload, signature) {
        return signature === crypto_1.default.createHmac('sha1', this.secretKey).update(payload).digest('hex');
    }
    async dispatchRequest(config) {
        try {
            return this.request[config.requestType || 'get'](config.endpoint, config.payload);
        }
        catch (error) {
            Helper_1.default.processError(error);
        }
    }
    async indexUser(name, identifier, email) {
        var _a;
        return (_a = (await this.dispatchRequest({
            requestType: 'post',
            endpoint: '/users',
            payload: { name, identifier, email }
        }))) === null || _a === void 0 ? void 0 : _a.data;
    }
    async updateUser(reference, identifier) {
        var _a;
        return (_a = (await this.dispatchRequest({
            requestType: 'put',
            endpoint: `/users/${reference}`,
            payload: { identifier }
        }))) === null || _a === void 0 ? void 0 : _a.data;
    }
    async deleteUser(reference) {
        var _a;
        return (_a = (await this.dispatchRequest({
            requestType: 'delete',
            endpoint: `/users/${reference}`
        }))) === null || _a === void 0 ? void 0 : _a.data;
    }
    async getUser(reference) {
        var _a;
        return (_a = (await this.dispatchRequest({
            endpoint: `/users/${reference}`
        }))) === null || _a === void 0 ? void 0 : _a.data;
    }
    async getLink(linkId) {
        var _a;
        return (_a = (await this.dispatchRequest({
            endpoint: `/link/${linkId}`
        }))) === null || _a === void 0 ? void 0 : _a.data;
    }
    async chargeLink(linkId, amount, remark) {
        var _a;
        return (_a = (await this.dispatchRequest({
            requestType: 'post',
            endpoint: `/link/${linkId}/charge`,
            payload: {
                amount, remark
            }
        }))) === null || _a === void 0 ? void 0 : _a.data;
    }
    async authorizeDirectCharge(reference, insufficientFunds) {
        var _a;
        return (_a = (await this.dispatchRequest({
            requestType: 'post',
            endpoint: `/debit/${reference}`,
            payload: {
                insufficient_funds: insufficientFunds
            }
        }))) === null || _a === void 0 ? void 0 : _a.data;
    }
    async processSendReceipt(receipt, insufficientFunds) {
        var _a;
        return (_a = (await this.dispatchRequest({
            requestType: 'post',
            endpoint: `/send/${receipt}`,
            payload: {
                insufficient_funds: insufficientFunds
            }
        }))) === null || _a === void 0 ? void 0 : _a.data;
    }
    async getSendReceipt(receipt) {
        var _a;
        return (_a = (await this.dispatchRequest({
            endpoint: `/send/${receipt}`
        }))) === null || _a === void 0 ? void 0 : _a.data;
    }
}
exports.Thepeer = Thepeer;
