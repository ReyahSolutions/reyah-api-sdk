/**
 * Job service types
 */

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
    expiry: Date;
}

/**
 * Job
 */
export interface Job {
    id: number;
    document_id: number;
    status: JobStatus;
    created_at: Date;
    updated_at: Date;
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
    datatypes_matches: { [index: number]: DatatypeMatch };
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
