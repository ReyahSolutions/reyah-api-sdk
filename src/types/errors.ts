/**
 * ReyahError implementations
 */

export class ServiceUnavailable extends Error {
    name: string;
    public static code: number = 503;
    public static error: string = "Service Unavailable";
    public static message: string = "Service currently unavailable";

    constructor() {
        super(ServiceUnavailable.message);
        this.name = ServiceUnavailable.name;
        Object.setPrototypeOf(this, ServiceUnavailable.prototype);
    }
}

/**
 * Implementation of ReyahError in case of unknown exception
 */
export class UnknownException extends Error {
    code: number = 500;
    error: string = "Internal Server Error";
    message: string = "Unknown error occurred";

    constructor(message?: string) {
        super(message || "Unknown error occurred");
        this.name = UnknownException.name;
        if (message) { this.message = message; }
        Object.setPrototypeOf(this, UnknownException.prototype);
    }
}

/**
 * Implementation of ReyahError in case of not found exception
 */
export class NotFoundException extends Error {
    name: string;
    public static code: number = 404;
    public static error: string = "Not Found";
    public static message: string = "Invalid username or password";

    constructor(message?: string) {
        super(message || NotFoundException.message);
        this.name = NotFoundException.name;
        if (message) { this.message = message; }
        Object.setPrototypeOf(this, NotFoundException.prototype);
    }
}

/**
 * Implementation of ReyahError in case of too many requests exception
 */
export class TooManyRequestsException extends Error {
    name: string;
    public static code: number = 429;
    public static error: string = "Too Many Requests";
    public static message: string = "Too many unsuccessful attempts";

    constructor(message?: string) {
        super(message || TooManyRequestsException.message);
        this.name = TooManyRequestsException.name;
        if (message) { this.message = message; }
        Object.setPrototypeOf(this, TooManyRequestsException.prototype);
    }
}

/**
 * Implementation of ReyahError in case of unauthorized exception
 */
export class UnauthorizedException extends Error {
    name: string;
    public static code: number = 401;
    public static error: string = "Unauthorized";
    public static message: string = "Invalid arguments";

    constructor(message?: string) {
        super(message || UnauthorizedException.message);
        this.name = UnauthorizedException.name;
        if (message) { this.message = message; }
        Object.setPrototypeOf(this, UnknownException.prototype);
    }
}

/**
 * Implementation of ReyahError in case of forbidden exception
 */
export class ForbiddenException extends Error {
    name: string;
    public static code: number = 403;
    public static error: string = "Forbidden";
    public static message: string = "Expired code";

    constructor(message?: string) {
        super(message || ForbiddenException.message);
        this.name = ForbiddenException.name;
        if (message) { this.message = message; }
        Object.setPrototypeOf(this, ForbiddenException.prototype);
    }
}
