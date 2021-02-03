/**
 * Feed
 */

import {FeedElement, InvalidFeedElement, PaginatedFeedElements, UnsupportedElement} from "../types/feed";
import newPaginationStatus from "./pagination";

/**
 * Feed Element
 */
export function newFeedElement(obj: any): FeedElement {
    return {
        id: obj.id,
        type : obj.type,
        created_at: new Date(obj.created_at),
        invalid_feed_element : obj.invalid_feed_element && newInvalidFeedElement(obj.invalid_feed_element),
        unsupported_element : obj.unsupported_element && newUnsupportedElement(),
    };
}

/**
 * Feed Elements
 */
export function newFeedElements(obj: any): PaginatedFeedElements {
    if (!Array.isArray(obj.jobs) || typeof obj.pagination_status !== 'object') {
        return {
            elements: [],
            pagination_status: newPaginationStatus(),
        };
    }
    return {
        elements: obj.jobs.map((elem: any) => newFeedElement(elem)),
        pagination_status: newPaginationStatus(obj.pagination_status),
    };
}

/**
 * Invalid Feed Element
 */
export function newInvalidFeedElement(obj : any): InvalidFeedElement{
    return {
        job_id : obj.job_id
    }
}

/**
 * Unsupported Feed Element
 */
export function newUnsupportedElement(): UnsupportedElement{
    return {}
}
