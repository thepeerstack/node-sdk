import {
  ServerError,
  ForbiddenError,
  UnauthorizedError,
  NotAcceptableError,
  InvalidPayloadError,
  InvalidResourceError,
  ServiceUnavailableError,
} from '../errors';


export default class Helper {
  static processError(error: any) {
    const { response: { status, data } } = error;
    const { error: errorData, message } = data;

    switch (status) {

      case 401: {
        throw new UnauthorizedError({ message });
      };

      case 403: {
        throw new ForbiddenError({ message });
      };

      case 404: {
        throw new InvalidResourceError({ message });
      };

      case 406: {
        throw new NotAcceptableError({ message });
      }

      case 422: {
        Object.keys(errorData).forEach((key) => {
          throw new InvalidPayloadError({ message: errorData[key] });
        });
      }

      case 503: {
        throw new ServiceUnavailableError({ message });
      };

      default: {
        throw new ServerError({ message });
      };
    }
  }
}