/**
 * Feed service types
 */

/**
 * Type of a feed element
 */
import { PaginationStatus } from './pagination';

export enum FeedElementType{
    INVALID = 'INVALID_FEED_ELEMENT',
}

/**
 * Feed element
 */
export interface FeedElement{
    id: string;
    created_at : Date;
    type : FeedElementType;
    invalid_feed_element? : InvalidFeedElement;
    unsupported_element? : UnsupportedElement;
}

export interface InvalidFeedElement{
    job_id : string;
}

export interface UnsupportedElement {
}

export interface PaginatedFeedElements {
    elements: FeedElement[];
    pagination_status: PaginationStatus;
}
