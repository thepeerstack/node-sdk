import axios from "axios";
import crypto from "crypto";

class Thepeer {
    constructor(secretKey) {
        this.secretKey = secretKey
        this.request = axios.create({
            baseURL: 'https://api.thepeer.co',
            headers: {
                'x-api-key': secretKey,
                'Accept': 'application/json'
            }
        });
    }

    validateSignature(payload, signature) {
        return signature === crypto.createHmac('sha1', this.secretKey).update(payload).digest('hex')
    }

    async indexUser(name, identifier, email) {
        await this.request.post("/users", {
            "name": name,
            "identifier": identifier,
            "email": email
        }).then((response) => {
            return response.data
        }).catch((error) => {
            processError(error)
        });
    }

    async updateUser(reference, identifier) {
        await this.request.put(`/users/${reference}`, {
            "identifier": identifier,
        }).then((response) => {
            return response.data
        }).catch((error) => {
            processError(error)
        });
    }

    async deleteUser(reference) {
        await this.request.delete(`/users/${reference}`)
            .then((response) => {
                return response.data
            }).catch((error) => {
                processError(error)
            });
    }

    async getUser(reference) {
        await this.request.get(`/users/${reference}`)
            .then((response) => {
                return response.data
            }).catch((error) => {
                processError(error)
            });
    }

    async getLink(link) {
        await this.request.get(`/link/${link}`)
            .then((response) => {
                return response.data
            }).catch((error) => {
                processError(error)
            });
    }

    async chargeLink(link, amount, remark) {
        await this.request.post(`/link/${link}/charge`, {
            "amount": amount,
            "remark": remark
        }).then((response) => {
            return response.data
        }).catch((error) => {
            processError(error)
        });
    }

    async authorizeDirectCharge(reference, insufficientFunds) {
        await this.request.post(`/debit/${reference}`, {
            "insufficient_funds": insufficientFunds,
        }).then((response) => {
            return response.data
        }).catch((error) => {
            processError(error)
        });
    }
}

function processError(error) {
    switch (error.response.status) {
        case 401:
            throw new UnauthorizedException(error.response.data.message)
        case 403:
            throw new ForbiddenException(error.response.data.message)
        case 404:
            throw new InvalidResourceException(error.response.data.message)
        case 406:
            throw new NotAcceptableException(error.response.data.message)
        case 503:
            throw new ServiceUnavailableException(error.response.data.message)
        default:
            throw new ServerErrorException(error.response.data.message)
    }
}

function UnauthorizedException(message) {
    return new Error(message);
}

function ServerErrorException(message) {
    return new Error(message);
}

function ServiceUnavailableException(message) {
    return new Error(message);
}

function NotAcceptableException(message) {
    return new Error(message);
}

function InvalidResourceException(message) {
    return new Error(message);
}

function InvalidPayloadException(message) {
    return new Error(message);
}

function ForbiddenException(message) {
    return new Error(message);
}

UnauthorizedException.prototype = Object.create(Error.prototype);
ServerErrorException.prototype = Object.create(Error.prototype);
ServiceUnavailableException.prototype = Object.create(Error.prototype);
NotAcceptableException.prototype = Object.create(Error.prototype);
InvalidResourceException.prototype = Object.create(Error.prototype);
InvalidPayloadException.prototype = Object.create(Error.prototype);
ForbiddenException.prototype = Object.create(Error.prototype);