import * as Core from './core';

/**
 * Authentication service types
 */

export interface AuthProvider {
    getName: () => string
    applyAuth: (request: Core.ReyahRequest, ctx: Context) => Promise<void>
    getTokenExpiry: () => Date
    canBeRenewed: () => boolean
    isLoggedIn: () => boolean
}

/**
 * Context is given at each request to the auth provider
 */
export interface Context {
    tryCount: number,
    lastError?: Error
}

export class AuthenticationException extends Error {
    name: string;

    isAuthError: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'AuthenticationException';
        this.isAuthError = true;
        Object.setPrototypeOf(this, AuthenticationException.prototype);
    }
}

export class NoAuthProvidedException extends AuthenticationException {
    name: string;

    constructor() {
        super('No authentication mechanism provided, use Reyah.auth.getInstance().useAuthProvider()');
        this.name = 'NoAuthProvidedException';
        Object.setPrototypeOf(this, NoAuthProvidedException.prototype);
    }
}

export class NotAuthenticatedException extends AuthenticationException {
    name: string;

    constructor() {
        super('The user is not authenticated on the API');
        this.name = 'NotAuthenticatedException';
        Object.setPrototypeOf(this, NotAuthenticatedException.prototype);
    }
}

export class CannotRefreshSessionException extends AuthenticationException {
    name: string;

    constructor() {
        super('The current session cannot be refreshed');
        this.name = 'CannotRefreshSessionException';
        Object.setPrototypeOf(this, CannotRefreshSessionException.prototype);
    }
}
