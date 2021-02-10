import { AxiosError, AxiosRequestConfig } from 'axios';
import { ReyahRequest } from './core';

export declare interface Events {
    on(event: 'request', listener: (request: ReyahRequest) => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
    on(event: 'axios:request', listener: (requestConfig: AxiosRequestConfig) => void): this;
    on(event: 'axios:error', listener: (error: AxiosError) => void): this;
    on(event: string, listener: Function): this;
}
