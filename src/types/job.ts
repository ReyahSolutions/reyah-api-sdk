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
 * ContentType
 */
export enum ContentType {
    PDF = 'application/pdf',
    PNG = 'image/png',
    JPEG = 'image/jpeg',
}

/**
 * Job extraction input type
 */
export enum InputType {
    SOURCE = 'SOURCE',
    CONVERTED = 'CONVERTED',
}

/**
 * Document recovery response format
 */
export interface DocumentWithType {
    url: string;
    content_type: ContentType;
    expiry: Date;
}

/**
 * Source document information
 */
export interface SourceDocument {
    name: string;
    content_type: ContentType;
    size: number;
}

/**
 * Extraction job
 */
export interface ExtractionJob {
    id: string;
    user_id: string;
    document_id: string;
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
export interface ExtractionJobField {
    field_id: string;
    name: string;
    element?: ExtractionJobElementField,
    table?: ExtractionJobTableField,
}
export interface ExtractionJobElementField {
    values: string[];
    datatypes_matches: { [index: string]: DatatypeMatch };
}
export interface ExtractionJobTableField {
    column_ids: string[],
    rows: ExtractionJobTableRowField[]
}
export interface ExtractionJobTableRowField {
    values: string[];
    datatypes_matches: { [index: string]: DatatypeMatch };
}
export interface RenderingJobField {
    field_id: string;
    values: string[];
}

/**
 * Job creation request
 */
export interface CreateRenderingJobRequest {
    document_id: string;
    content_type: ContentType;
    ignore_datatypes?: boolean;
    font_size: number;
    fields: RenderingJobField[];
}
export interface CreateExtractionJobRequest {
    document_id: string;
    content_type: ContentType;
    document_name?: string;
}

/**
 * Job creation response
 */
export interface CreatedJob extends DocumentWithType {
    id: string;
    document_name: string;
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
    ids?: string[];
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
export interface JobDocument {
    name?: string;
    content_type: ContentType;
}
export interface CreateExtractionBatchRequest {
    document_id: string;
    job_documents: JobDocument[];
}

/**
 * Get extraction batch in CSV
 */
export interface CSVExtractionBatchRequest {
    batch_id: string;
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
    batch_id: string;
    size: number;
    job_success_count: number;
    job_error_count: number;
    job_pending_count: number;
    document_id: string;
    jobs: string[];
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
    batch_id: string;
    size: number;
    document_id: string;
    jobs: CreatedJob[];
}

/**
 * Extraction batch result
 */
export interface JobOutputFromBatch {
    job_id: string;
    status: JobStatus;
    fields: ExtractionJobField[];
}
export interface BatchOutput {
    batch_id: string;
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
    id: string;
    user_id: string;
    document_id: string;
    status: JobStatus;
    created_at: Date;
    updated_at: Date;
}

export interface PaginatedRenderingJobs {
    jobs: RenderingJob[],
    pagination_status: PaginationStatus,
}
