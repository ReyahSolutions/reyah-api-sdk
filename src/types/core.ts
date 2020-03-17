import { Method } from 'axios';
import { Config } from '../core/config';
/**
 * Low-level methods of the SDK according to the HTTP protocol request types
 */

/**
 * Parameters of a query to form the host name
 */
export interface ReyahRequestConfiguration {
    readonly method: Method;
    readonly url: string;
    readonly headers: any;
    readonly data?: any;
}

/**
 * Wrapper for interoperability
 */
export interface ReyahRequestResponse {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: ReyahRequestConfiguration;
    request?: any;
}

export interface ReyahRequestConstructor {
    new (url: string, method: Method, data?: any): ReyahRequest;
}
export interface ReyahRequest {
    setHeader(key: string, value: string): void
    setQueryString(key: string, value: string): void
    execute(): Promise<ReyahRequestResponse>
}

/**
 * Declaration of available HTTP methods
 */
export interface ReyahServiceRequest {
    /**
     * Prepare an HTTP GET request based on information provided in the parameter
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param useAuth Use auth indicates whether this request should an auth mechanism
     * @return A promise
     */
    get(subpath: string, useAuth: boolean): Promise<ReyahRequestResponse>;

    /**
     * Prepare an HTTP POST request based on information provided in the parameter
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param data Associated data to be sent in the body of the request
     * @param useAuth Use auth indicates whether this request should an auth mechanism
     * @return A promise
     */
    post(subpath: string, data: object, useAuth: boolean): Promise<ReyahRequestResponse>;

    /**
     * Prepare an HTTP PUT request based on information provided in the parameter
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param data Associated data to be sent in the body of the request
     * @param useAuth Use auth indicates whether this request should an auth mechanism
     * @return A promise
     */
    put(subpath: string, data: object, useAuth: boolean): Promise<ReyahRequestResponse>;

    /**
     * Prepare an HTTP PATCH request based on information provided in the parameter
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param data Associated data to be sent in the body of the request
     * @param useAuth Use auth indicates whether this request should an auth mechanism
     * @return A promise
     */
    patch(subpath: string, data: object, useAuth: boolean): Promise<ReyahRequestResponse>;

    /**
     * Prepare an HTTP DELETE request based on information provided in the parameter
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param useAuth Use auth indicates whether this request should an auth mechanism
     * @return A promise
     */
    delete(subpath: string, useAuth: boolean): Promise<ReyahRequestResponse>;
}

/**
 * Retrieves the information contained in [[ReyahRequestConfiguration]] to form the host name and attaches the subpath to it
 * @param subpath Subpath to attach to the host name to form the full URL
 * @return A complete URL
 */
export function getUrl(subpath: string): string {
    return `${Config.getConfig().api_protocol}://${Config.getConfig().api_hostname}${subpath}`;
}

export interface ReyahErrorResponse {
    error: {
        code: number,
        status: string,
        message: string,
        details?: any[]
    }
}

export class ReyahRequestError extends Error {
    name: string;
    code: number;
    request: ReyahRequestConfiguration;
    response?: ReyahRequestResponse;
    body?: ReyahErrorResponse;
    isReyahRequestError: boolean;

    constructor(code: number, request: ReyahRequestConfiguration, response?: ReyahRequestResponse, body?: ReyahErrorResponse, message?: string) {
        super(message || 'An error happened while requesting the API');
        this.name = ReyahRequestError.name;
        this.code = code;
        this.request = request;
        this.response = response;
        this.body = body;
        this.isReyahRequestError = true;
        Object.setPrototypeOf(this, ReyahRequestError.prototype);
    }
}
