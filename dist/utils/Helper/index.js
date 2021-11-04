"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
class Helper {
    static processError(error) {
        const { response: { status, data } } = error;
        const { error: errorData, message } = data;
        switch (status) {
            case 401:
                {
                    throw new errors_1.UnauthorizedError({ message });
                }
                ;
            case 403:
                {
                    throw new errors_1.ForbiddenError({ message });
                }
                ;
            case 404:
                {
                    throw new errors_1.InvalidResourceError({ message });
                }
                ;
            case 406: {
                throw new errors_1.NotAcceptableError({ message });
            }
            case 422: {
                Object.keys(errorData).forEach((key) => {
                    throw new errors_1.InvalidPayloadError({ message: errorData[key] });
                });
            }
            case 503:
                {
                    throw new errors_1.ServiceUnavailableError({ message });
                }
                ;
            default:
                {
                    throw new errors_1.ServerError({ message });
                }
                ;
        }
    }
}
exports.default = Helper;
