/**
 * Feed service types
 */

/**
 * Type of a feed element
 */
import { PaginationStatus } from './pagination';

export enum FeedElementType{
    INVALID_JOB = 'invalid_job',
}

/**
 * Feed element
 */
export interface FeedElement{
    id: string;
    created_at : Date;
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
