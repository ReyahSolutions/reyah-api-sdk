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
    WAITING_FOR_CONVERSION = 'WAITING_FOR_CONVERSION',
    CONVERTING = 'CONVERTING',
    WAITING_FOR_PROCESSING = 'WAITING_FOR_PROCESSING',
    PROCESSING = 'PROCESSING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED',
}

/**
 * Document recovery response format
 */
export interface DocumentWithType {
    url: string;
    content_type: string;
    expiry: Date;
}

export interface Document {
    url: string;
    expiry: Date;
}

/**
 * Source document information
 */
export interface SourceDocument {
    name: string;
    content_type: string;
    size: number;
}

/**
 * Extraction job
 */
export interface ExtractionJob {
    id: number;
    user_id: string;
    document_id: number;
    status: JobStatus;
    tags: {
        [index: string]: string
    };
    source_document: SourceDocument;
    created_at: Date;
    updated_at: Date;
}

export interface PaginatedExtractionJobs {
    jobs: ExtractionJob[],
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
    field_id: number;
    name: string;
    values: string[];
    datatypes_matches: {[index: string]: DatatypeMatch};
}

/**
 * Job creation request
 */
export interface CreateJobRequest {
    document_id: number;
    content_type: string;
    fields?: JobField[];
}

/**
 * Job creation response
 */
export interface CreatedJob extends DocumentWithType {
    id: number;
    document_name: number;
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
    document_id: number;
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
    document_id: number;
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
    document_id: number;
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

/**
 * Rendering
 */

/**
 * Rendering job
 */

export interface RenderingJob {
    id: number;
    user_id: string;
    document_id: number;
    status: JobStatus;
    created_at: Date;
    updated_at: Date;
}

export interface PaginatedRenderingJobs {
    jobs: RenderingJob[],
    pagination_status: PaginationStatus,
}
