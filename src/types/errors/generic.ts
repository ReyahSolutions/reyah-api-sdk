/**
 * ReyahError implementations
 */
import { ReyahRequestError } from '../core';
import { ReyahError } from '../reyah';

export class ServiceUnavailable extends ReyahError {
    name: string;

    public static error: string = 'Service Unavailable';

    constructor(err: ReyahRequestError) {
        super(err);
        this.name = 'ServiceUnavailable';
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
        this.name = 'UnknownException';
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
        this.name = 'InvalidRequestException';
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
        this.name = 'NotFoundException';
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
        this.name = 'TooManyRequestsException';
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
        this.name = 'UnauthorizedException';
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
        this.name = 'ForbiddenException';
        Object.setPrototypeOf(this, ForbiddenException.prototype);
    }
}
