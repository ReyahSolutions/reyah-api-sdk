/**
 * ReyahError implementations
 */
import { ReyahRequestError } from './core';
import { ReyahError } from './reyah';


export class ServiceUnavailable extends ReyahError {
    name: string;
    public static error: string = 'Service Unavailable';

    constructor(err: ReyahRequestError) {
        super(err);
        this.name = ServiceUnavailable.name;
        Object.setPrototypeOf(this, ServiceUnavailable.prototype);
    }
}

/**
 * Implementation of ReyahError in case of unknown exception
 */
export class UnknownException extends ReyahError {
    error: string = 'Internal Server Error';

    constructor(err: ReyahRequestError) {
        super(err);
        this.name = UnknownException.name;
        Object.setPrototypeOf(this, UnknownException.prototype);
    }
}

/**
 * Implementation of ReyahError in case of not found exception
 */
export class InvalidRequestException extends ReyahError {
    name: string;
    public static error: string = 'Invalid request';

    constructor(err: ReyahRequestError) {
        super(err);
        this.name = InvalidRequestException.name;
        Object.setPrototypeOf(this, InvalidRequestException.prototype);
    }
}

/**
 * Implementation of ReyahError in case of not found exception
 */
export class NotFoundException extends ReyahError {
    name: string;
    public static error: string = 'Not Found';

    constructor(err: ReyahRequestError) {
        super(err);
        this.name = NotFoundException.name;
        Object.setPrototypeOf(this, NotFoundException.prototype);
    }
}

/**
 * Implementation of ReyahError in case of too many requests exception
 */
export class TooManyRequestsException extends ReyahError {
    name: string;
    public static error: string = 'Too Many Requests';

    constructor(err: ReyahRequestError) {
        super(err);
        this.name = TooManyRequestsException.name;
        Object.setPrototypeOf(this, TooManyRequestsException.prototype);
    }
}

/**
 * Implementation of ReyahError in case of unauthorized exception
 */
export class UnauthorizedException extends ReyahError {
    name: string;
    public static error: string = 'Unauthorized';

    constructor(err: ReyahRequestError) {
        super(err);
        this.name = UnauthorizedException.name;
        Object.setPrototypeOf(this, UnknownException.prototype);
    }
}

/**
 * Implementation of ReyahError in case of forbidden exception
 */
export class ForbiddenException extends ReyahError {
    name: string;
    public static error: string = 'Forbidden';

    constructor(err: ReyahRequestError) {
        super(err);
        this.name = ForbiddenException.name;
        Object.setPrototypeOf(this, ForbiddenException.prototype);
    }
}

export function dispatchError(err: any): Error {
    if (err.isReyahRequestError) {
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
