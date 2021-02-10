import { AxiosError, AxiosRequestConfig } from 'axios';
import { ReyahRequest } from './core';

interface ReyahEvents {
    'request': (request: ReyahRequest) => void;
    'error': (error: Error) => void;
    'axios:request': (requestConfig: AxiosRequestConfig) => void;
    'axios:error': (error: AxiosError) => void;
}

export declare interface Events {
    addListener<U extends keyof ReyahEvents>(
        event: U, listener: ReyahEvents[U]
    ): this;

    on<U extends keyof ReyahEvents>(
        event: U, listener: ReyahEvents[U]
    ): this;

    emit<U extends keyof ReyahEvents>(
        event: U, ...args: Parameters<ReyahEvents[U]>
    ): boolean;
}
