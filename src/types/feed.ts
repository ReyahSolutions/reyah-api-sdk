/**
 * Feed service types
 */

/**
 * Type of a feed element
 */
import { PaginationStatus } from './pagination';

export enum FeedElementType {
    NONE = 'NONE',
    INVALID_JOB = 'INVALID_JOB',
    UNSUPPORTED = 'UNSUPPORTED',
}

/**
 * Feed element
 */
export interface FeedElement {
    id: string;
    created_at : Date;
    seen : boolean;
    type : FeedElementType;
    invalid_job? : InvalidJobFeedElement;
    unsupported_element? : UnsupportedFeedElement;
}

export interface InvalidJobFeedElement {
    job_id : string;
}

export interface UnsupportedFeedElement {
}

export interface PaginatedFeedElements {
    elements: FeedElement[];
    pagination_status: PaginationStatus;
}
