/**
 * Job service types
 */

/**
 * Status of a job
 */
export enum JobStatus {
    NONE = 1,
    WAITING_FOR_RECEIVING,
    WAITING_FOR_PROCESSING,
    PROCESSING,
    SUCCEEDED,
    FAILED,
}

/**
 * Document recovery response format
 */
export interface Document {
    url: string;
    expiry: Date;
}

/**
 * Job
 */
export interface Job {
    uuid: string;
    model_uuid: string;
    status: JobStatus;
    created_at: Date;
    updated_at: Date;
}

/**
 * Job jobField
 */
export interface JobField {
    name: string;
    value: string[];
}

/**
 * Job creation request
 */
export interface CreateJob {
    model_uuid: string;
    content_type: string;
    fields?: JobField[];
}

/**
 * Job creation response
 */
export interface NewJob extends Document {
    uuid: string;
}
