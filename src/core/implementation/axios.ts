import axios, { AxiosRequestConfig, Method } from 'axios';
import EventEmitter from 'events';
import * as Core from '../../types/core';
import { newReyahErrorResponse, ReyahRequestConfiguration, ReyahRequestError } from '../../types/core';

/**
 * AxiosEmitter is an internal event emitter conceived to transmit axios event to Events
 */
class AxiosEmitter extends EventEmitter {
}
export const axiosEmitter = new AxiosEmitter();

/**
 * Low-level controller for HTTP requests from the SDK implementing Axios as controller
 */

export class Axios implements Core.ReyahRequest {
    private readonly config: AxiosRequestConfig;

    constructor(url: string, method: Method, data?: any) {
        this.config = {};
        this.config.url = url;
        this.config.method = method;
        this.config.headers = {};
        this.config.params = {};
        if (data) {
            this.config.data = data;
        }
    }

    public setHeader(key: string, value: string): void {
        this.config.headers[key] = value;
    }

    public setQueryString(key: string, value: string): void {
        this.config.params[key] = value;
    }

    private getConfig(): ReyahRequestConfiguration {
        return {
            method: this.config.method || 'GET',
            url: this.config.url || '',
            headers: this.config.headers,
            data: this.config.data,
        };
    }

    public async execute(): Promise<Core.ReyahRequestResponse> {
        try {
            axiosEmitter.emit('request', this.config);
            return await axios.request(this.config) as Core.ReyahRequestResponse;
        } catch (e) {
            axiosEmitter.emit('error', e);
            if (e.isAxiosError) {
                const code = e.response?.status || 0;
                const data = e.response?.data;
                const msg: string | undefined = e.response?.data?.error?.message;
                throw new ReyahRequestError(code, this.getConfig(), e.response, newReyahErrorResponse(data), msg);
            }
            throw new ReyahRequestError(0, this.getConfig());
        }
    }
}

export default Axios;
