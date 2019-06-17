/**
 * Low-level methods of the SDK according to the HTTP protocol request types
 */

/**
 * Parameters of a query to form the host name
 */
export interface ReyahRequestConfiguration {
    readonly protocol: string;
    readonly hostname: string;
    readonly version?: string;
    readonly url?: string;
    readonly basePath: string;
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

/**
 * Declaration of available HTTP methods
 */
export interface ReyahServiceRequest {
    /**
     * Executes an HTTP GET request based on information provided in the parameter
     * @param config Parameters of a query to form the host name
     * @param subpath Subpath to attach to the host name to form the full URL
     * @return A promise
     */
    get(config: ReyahRequestConfiguration, subpath: string): Promise<ReyahRequestResponse>;

    /**
     * Executes an HTTP POST request based on information provided in the parameter
     * @param config Parameters of a query to form the host name
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param data Associated data to be sent in the body of the request
     * @return A promise
     */
    post(config: ReyahRequestConfiguration, subpath: string, data: object): Promise<ReyahRequestResponse>

    /**
     * Executes an HTTP PUT request based on information provided in the parameter
     * @param config Parameters of a query to form the host name
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param data Associated data to be sent in the body of the request
     * @return A promise
     */
    put(config: ReyahRequestConfiguration, subpath: string, data: object): Promise<ReyahRequestResponse>

    /**
     * Executes an HTTP PATCH request based on information provided in the parameter
     * @param config Parameters of a query to form the host name
     * @param subpath Subpath to attach to the host name to form the full URL
     * @param data Associated data to be sent in the body of the request
     * @return A promise
     */
    patch(config: ReyahRequestConfiguration, subpath: string, data: object): Promise<ReyahRequestResponse>

    /**
     * Executes an HTTP DELETE request based on information provided in the parameter
     * @param config Parameters of a query to form the host name
     * @param subpath Subpath to attach to the host name to form the full URL
     * @return A promise
     */
    delete(config: ReyahRequestConfiguration, subpath: string): Promise<ReyahRequestResponse>
}

/**
 * Retrieves the information contained in [[ReyahRequestConfiguration]] to form the host name and attaches the subpath to it
 * @param config Parameters of a query to form the host name
 * @param subpath Subpath to attach to the host name to form the full URL
 * @return A complete URL
 */
export function getUrl(config: ReyahRequestConfiguration, subpath: string): string {
    return `${config.protocol}://${config.hostname}/${config.version ? config.version + subpath : subpath}`;
}
