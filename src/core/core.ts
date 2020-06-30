import { Method } from 'axios';
import { Axios } from './implementation/axios';
import * as Core from '../types/core';
import AuthHandler from '../authentication/authentication';
import { AuthenticationException, Context, NoAuthProvidedException } from '..';

/**
 * Implementation of [[ReyahServiceRequest]] interface
 */

/**
 * ReyahServiceRequestor handle the execution of request to the Reyah API
 */
class ReyahServiceRequestor implements Core.ReyahServiceRequest {
    private readonly retryCount: number;
    private readonly Requester: Core.ReyahRequestConstructor;

    constructor(requester: Core.ReyahRequestConstructor, retryCount: number) {
        this.Requester = requester;
        this.retryCount = retryCount;
    }

    private async execute(method: Method, subpath: string, useAuth: boolean, data?: any): Promise<Core.ReyahRequestResponse> {
        const ctx: Context = {
            tryCount: 0,
            lastError: undefined,
        };
        while (ctx.tryCount < this.retryCount) {
            try {
                const request = new this.Requester(Core.getUrl(subpath), method, data);
                if (useAuth) {
                    await AuthHandler.getInstance().getAuthProvider().applyAuth(request, ctx);
                }
                return await request.execute();
            } catch (e) {
                // Do not retry the request if the error is caused by a NoAuthProvider error
                if (e instanceof NoAuthProvidedException) {
                    throw e;
                }
                // Do not retry the request if the error is located client side
                if (e.isReyahRequestError && e.code >= 300 && e.code < 500) {
                    throw e;
                }
                ctx.lastError = e;
                ctx.tryCount += 1;
            }
        }
        if (ctx.lastError) {
            throw ctx.lastError;
        } else {
            throw new AuthenticationException('Could not request API, too much try');
        }
    }

    /**
     * Executes an HTTP GET request based on information provided in the parameter
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param useAuth Use auth indicates whether this request should an auth mechanism
     * @return A promise
     */
    public get(subpath: string, useAuth: boolean): Promise<Core.ReyahRequestResponse> {
        return this.execute('GET', subpath, useAuth);
    }

    /**
     * Executes an HTTP POST request based on information provided in the parameter
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param data Associated data to be sent in the body of the request
     * @param useAuth Use auth indicates whether this request should an auth mechanism
     * @return A promise
     */
    public post(subpath: string, data: object, useAuth: boolean): Promise<Core.ReyahRequestResponse> {
        return this.execute('POST', subpath, useAuth, data);
    }

    /**
     * Executes an HTTP PUT request based on information provided in the parameter
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param data Associated data to be sent in the body of the request
     * @param useAuth Use auth indicates whether this request should an auth mechanism
     * @return A promise
     */
    public put(subpath: string, data: object, useAuth: boolean): Promise<Core.ReyahRequestResponse> {
        return this.execute('PUT', subpath, useAuth, data);
    }

    /**
     * Executes an HTTP PATCH request based on information provided in the parameter
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param data Associated data to be sent in the body of the request
     * @param useAuth Use auth indicates whether this request should an auth mechanism
     * @return A promise
     */
    public patch(subpath: string, data: object, useAuth: boolean): Promise<Core.ReyahRequestResponse> {
        return this.execute('PATCH', subpath, useAuth, data);
    }

    /**
     * Executes an HTTP DELETE request based on information provided in the parameter
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param useAuth Use auth indicates whether this request should an auth mechanism
     * @return A promise
     */
    public delete(subpath: string, useAuth: boolean): Promise<Core.ReyahRequestResponse> {
        return this.execute('DELETE', subpath, useAuth);
    }
}

/**
 * Exports the implementation of core types
 */

export const reyahServiceRequest = new ReyahServiceRequestor(Axios, 3) as Core.ReyahServiceRequest;
export default {
    reyahServiceRequest,
};
