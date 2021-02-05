import * as Feed from '../types/feed';
import { Service } from '../types/reyah';
import * as Status from '../types/status';
import { reyahServiceRequest } from '../core/core';
import newServiceStatus from '../constructor/status';
import { dispatchError } from '../core/errors';
import { Pagination } from '../types/pagination';
import { newFeedElements } from '../constructor/feed';

export class FeedService implements Service {
    readonly subpath = '/feed';

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
     * Retrieves the feeds elements of a user
     * @return A promise of the result of the feed elements retrieving transaction
     */
    public async retrieveAllFeedElements(startAt: Date, pagination?: Pagination): Promise<Feed.PaginatedFeedElements> {
        let subpath: string = `${this.subpath}/elements`;
        const qs = new URLSearchParams();
        if (pagination) {
            qs.append('page', pagination.page.toString());
            qs.append('size', pagination.size.toString());
        }
        qs.append('start_at', startAt.toISOString());
        const queryParams = qs.toString();
        if (queryParams) {
            subpath += `?${queryParams}`;
        }
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newFeedElements(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Set an element as seen
     */
    public async setSeenElement(elementID: string) {
        let subpath: string = `${this.subpath}/element/${elementID}`;
        const qs = new URLSearchParams();
        qs.append('element_id', elementID);
        const queryParams = qs.toString();
        if (queryParams) {
            subpath += `?${queryParams}`;
        }
        try {
            await reyahServiceRequest.put(subpath, undefined, true);
        } catch (err) {
            throw dispatchError(err);
        }
    }
}

export const feed = new FeedService();
export default feed;
