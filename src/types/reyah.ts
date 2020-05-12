import * as Core from './core';
import { ReyahErrorResponse, ReyahRequestError } from './core';
import * as Status from './status';

/**
 * Reyah SDK related types
 */

export type Protocol = 'http' | 'https';
export interface IConfig {
    api_protocol: Protocol
    api_hostname: string
    auth_protocol: Protocol
    auth_hostname: string
}

/**
 * Standard Reyah error
 */
export class ReyahError extends Error {
    name: string;
    message: string;
    stack?: string;
    reyaherr: string;
    code?: number;
    body?: ReyahErrorResponse;
    request?: Core.ReyahRequestConfiguration;
    response?: Core.ReyahRequestResponse;

    constructor(e: ReyahRequestError) {
        super(e.message);
        this.name = 'ReyahError';
        this.message = e.message;
        this.stack = e.stack;
        this.reyaherr = e.body?.error.reyah_err || 'UnknownErr';
        this.code = e.code;
        this.body = e.body;
        this.request = e.request;
        this.response = e.response;
        Object.setPrototypeOf(this, ReyahError.prototype);
    }
}

/**
 * Minimum requirements for reyah service implementations
 */
export interface Service {
    alive(): Promise<Status.ServiceStatus>;
}
