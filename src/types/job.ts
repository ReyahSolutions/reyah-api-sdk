/**
 * Job service types
 */

import { PaginationStatus } from './pagination';

/**
 * Status of a job
 */
export enum JobStatus {
    NONE = 'NONE',
    WAITING_FOR_RECEIVING = 'WAITING_FOR_RECEIVING',
    WAITING_FOR_PROCESSING = 'WAITING_FOR_PROCESSING',
    PROCESSING = 'PROCESSING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED',
}

/**
 * Document recovery response format
 */
export interface Document {
    url: string;
    content_type: string;
    expiry: Date;
}

/**
 * Job
 */
export interface Job {
    id: number;
    document_id: string;
    status: JobStatus;
    tags: {
        [index: string]: string
    };
    created_at: Date;
    updated_at: Date;
}

export interface PaginatedJobs {
    jobs: Job[],
    pagination_status: PaginationStatus,
}

/**
 * DatatypeMatch
 */
export interface DatatypeMatch {
    name: string;
    match: boolean;
    capture: string[];
}

/**
 * Job jobField
 */
export interface JobField {
    field_id: string;
    name: string;
    values: string[];
    datatypes_matches: {[index: number]: DatatypeMatch};
}

/**
 * Job creation request
 */
export interface CreateJobRequest {
    document_id: string;
    content_type: string;
    fields?: JobField[];
}

/**
 * Job creation response
 */
export interface CreatedJob extends Document {
    id: number;
}

/**
 * Job extraction type
 */
export enum ExtractionType {
    IDS = 'IDS',
    DATE = 'DATE',
}

/**
 * Job extraction CSV request
 */
export interface CSVExtractionRequest {
    extraction_type: ExtractionType;
    ids?: number[];
    start_date?: Date;
    end_date?: Date;
    include_datatype: boolean;
}
export interface InternalCSVExtractionRequest {
    extraction_type: ExtractionType;
    ids?: string;
    start_date?: string;
    end_date?: string;
    include_datatype: boolean;
}

/**
 * CSV extraction presigned url
 */
export interface CSVExtractionUrl {
    url: string;
    expiry: Date;
}

/**
 * Extraction Batch
 */

/**
 * Create extraction batch request
 */
export interface CreateExtractionBatchRequest {
    size: number;
    document_id: string;
    content_type?: string;
    content_types?: string[];
}

/**
 * Get extraction batch in CSV
 */
export interface CSVExtractionBatchRequest {
    batch_id: number;
    include_datatype: boolean;
}
export interface InternalCSVExtractionBatchRequest {
    include_datatype: boolean;
}
export interface ExtractionBatchCSV {
    url: string;
    expiry: Date;
    job_success_count: number;
    job_error_count: number;
    job_pending_count: number;
}

/**
 * Extraction batch(es)
 */
export interface Batch {
    batch_id: number;
    size: number;
    job_success_count: number;
    job_error_count: number;
    job_pending_count: number;
    document_id: string;
    jobs: number[];
    created_at: Date;
}
export interface Batches {
    batches: Batch[];
    pagination_status: PaginationStatus,
}

/**
 * Extraction batch creation result
 */
export interface CreatedBatch {
    batch_id: number;
    size: number;
    document_id: string;
    jobs: CreatedJob[];
}

/**
 * Extraction batch result
 */
export interface JobOutputFromBatch {
    job_id: number;
    status: JobStatus;
    fields: JobField[];
}
export interface BatchOutput {
    batch_id: number;
    job_success_count: number;
    job_error_count: number;
    job_pending_count: number;
    results: JobOutputFromBatch[];
    pagination_status: PaginationStatus;
}
