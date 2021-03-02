import { ResourceName, QuotaResource, QuotaResources } from '../types/quota';
import { Service } from '../types/reyah';
import * as Status from '../types/status';
import { reyahServiceRequest } from '../core/core';
import newServiceStatus from '../constructor/status';
import { newQuotaResource, newQuotaResources } from '../constructor/quota';
import { dispatchError } from '../core/errors';

export class QuotaService implements Service {
    readonly subpath = '/quota';

    /**
     * Remote service status
     * @return whether the service is alive or not
     */
    public async alive(): Promise<Status.ServiceStatus> {
        const subpath: string = `${this.subpath}/health`;
        try {
            const resp = await reyahServiceRequest.get(subpath, false);
            return newServiceStatus(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves all the quotas of a user
     * @return A promise of the result of the quota resources retrieving transaction
     */
    public async retrieveAllQuota(): Promise<QuotaResources> {
        const subpath: string = `${this.subpath}/resources`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newQuotaResources(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieve a specific quota of a user
     * @param resourceName The name of the resource to fetch
     * @return A promise of the result of the quota resource retrieving transaction
     */
    public async retrieveQuota(resourceName: ResourceName): Promise<QuotaResource> {
        const subpath: string = `${this.subpath}/resources/${resourceName}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newQuotaResource(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }
}

export const quota = new QuotaService();
export default quota;
