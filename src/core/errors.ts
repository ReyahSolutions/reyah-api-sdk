import {
    ForbiddenException,
    InvalidRequestException,
    NotFoundException,
    ServiceUnavailable,
    TooManyRequestsException,
    UnauthorizedException,
    UnknownException,
} from '../types/errors/generic';
import { ReyahError } from '../types/reyah';
import { ReyahRequestError } from '../types/core';

export function dispatchError(err: any, customHandler?: (err: ReyahRequestError) => Error | undefined): Error {
    if (err.isReyahRequestError) {
        let error: Error | undefined;
        if (customHandler) {
            error = customHandler(err);
        }
        if (error !== undefined) {
            return error;
        }
        switch (err.code) {
            case 400:
                return new InvalidRequestException(err);
            case 401:
                return new UnauthorizedException(err);
            case 403:
                return new ForbiddenException(err);
            case 404:
                return new NotFoundException(err);
            case 429:
                return new TooManyRequestsException(err);
            case 500:
                return new UnknownException(err);
            case 502:
            case 503:
                return new ServiceUnavailable(err);
            default:
                return new ReyahError(err);
        }
    } else {
        return err;
    }
}
