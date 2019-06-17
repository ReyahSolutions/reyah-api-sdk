import axios, { AxiosError } from "axios";
import { ReyahError } from "../../types/reyah";
import * as Core from "../../types/core";
import { UnknownException } from "../../types/errors";

/**
 * Low-level controller for HTTP requests from the SDK implementing Axios as controller
 */

/**
 * Implementation of [[ReyahServiceRequest]] interface using Axios
 */
class Axios implements Core.ReyahServiceRequest {
    /**
     * Executes an HTTP GET request based on information provided in the parameter
     * @param config Parameters of a query to form the host name
     * @param subpath Subpath to attach to the host name to form the full URL
     * @return A promise
     */
    public get(config: Core.ReyahRequestConfiguration, subpath: string): Promise<Core.ReyahRequestResponse> {
        return axios.get(Core.getUrl(config, subpath), config) as Promise<Core.ReyahRequestResponse>;
    }

    /**
     * Executes an HTTP POST request based on information provided in the parameter
     * @param config Parameters of a query to form the host name
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param data Associated data to be sent in the body of the request
     * @return A promise
     */
    public post(config: Core.ReyahRequestConfiguration, subpath: string, data: object): Promise<Core.ReyahRequestResponse> {
        return axios.post(Core.getUrl(config, subpath), data, config) as Promise<Core.ReyahRequestResponse>;
    }

    /**
     * Executes an HTTP PUT request based on information provided in the parameter
     * @param config Parameters of a query to form the host name
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param data Associated data to be sent in the body of the request
     * @return A promise
     */
    public put(config: Core.ReyahRequestConfiguration, subpath: string, data: object): Promise<Core.ReyahRequestResponse> {
        return axios.put(Core.getUrl(config, subpath), data, config) as Promise<Core.ReyahRequestResponse>;
    }

    /**
     * Executes an HTTP PATCH request based on information provided in the parameter
     * @param config Parameters of a query to form the host name
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param data Associated data to be sent in the body of the request
     * @return A promise
     */
    public patch(config: Core.ReyahRequestConfiguration, subpath: string, data: object): Promise<Core.ReyahRequestResponse> {
        return axios.patch(Core.getUrl(config, subpath), data, config) as Promise<Core.ReyahRequestResponse>;
    }

    /**
     * Executes an HTTP DELETE request based on information provided in the parameter
     * @param config Parameters of a query to form the host name
     * @param subpath Subpath to attach to the host name to form the full URL
     * @return A promise
     */
    public delete(config: Core.ReyahRequestConfiguration, subpath: string): Promise<Core.ReyahRequestResponse> {
        return axios.delete(Core.getUrl(config, subpath), config) as Promise<Core.ReyahRequestResponse>;
    }
}

/**
 * Implementation of [[ReyahError]] interface for Axios
 */
export class ReyahErrorAxios extends ReyahError {
    constructor(err: AxiosError, message?: string) {
        super(message || 'An error occurred during the execution of the request', err);
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (err.response.data.message)
                this.message += `\n${err.response.data.message}`;
            [this.code, this.error] = [err.response.status, err.response.data.error];
        } else if (err.request) {
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            const {code, error, message} = new UnknownException("The request was made but no response was received");
            [this.code, this.error, this.message] = [code, error, `${this.message}\n${message}`];
        } else {
            const {code, error, message} = new UnknownException("Something happened in setting up the request that triggered an Error");
            [this.code, this.error, this.message] = [code, error, `${this.message}\n${message}`];
        }
        this.request = err.config as Core.ReyahRequestConfiguration;
    }
}

export const AxiosServiceRequest = new Axios();
export default AxiosServiceRequest;
