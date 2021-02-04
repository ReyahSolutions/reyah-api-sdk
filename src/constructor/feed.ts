/**
 * Feed
 */

import {
    FeedElement, InvalidJobFeedElement, PaginatedFeedElements, UnsupportedFeedElement,
} from '../types/feed';
import newPaginationStatus from './pagination';

/**
 * Invalid Feed Element
 */
export function newInvalidFeedElement(obj: any): InvalidJobFeedElement {
    return {
        job_id: obj.job_id,
    };
}

/**
 * Unsupported Feed Element
 */
export function newUnsupportedElement(): UnsupportedFeedElement {
    return {};
}

/**
 * Feed Element
 */
export function newFeedElement(obj: any): FeedElement {
    return {
        id: obj.id,
        type: obj.type,
        created_at: new Date(obj.created_at),
        invalid_job: obj.invalid_job && newInvalidFeedElement(obj.invalid_job),
        unsupported_element: obj.unsupported_element && newUnsupportedElement(),
    };
}

/**
 * Feed Elements
 */
export function newFeedElements(obj: any): PaginatedFeedElements {
    if (!Array.isArray(obj.feed_elements) || typeof obj.pagination_status !== 'object') {
        return {
            elements: [],
            pagination_status: newPaginationStatus(),
        };
    }
    return {
        elements: obj.feed_elements.map((elem: any) => newFeedElement(elem)),
        pagination_status: newPaginationStatus(obj.pagination_status),
    };
}
