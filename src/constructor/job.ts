import {
    CreatedJob,
    CSVExtractionUrl,
    DatatypeMatch,
    DocumentWithType,
    Document,
    ExtractionJob,
    PaginatedExtractionJobs,
    ExtractionJobField,
    RenderingJobField,
    CreatedBatch,
    Batch,
    Batches,
    BatchOutput,
    JobOutputFromBatch,
    ExtractionBatchCSV,
    SourceDocument,
    RenderingJob,
    PaginatedRenderingJobs,
} from '..';
import newPaginationStatus from './pagination';

/**
 * Document recovery response format
 */
export function newDocumentWithType(obj: any): DocumentWithType {
    return {
        expiry: new Date(obj.expiry),
        content_type: obj.content_type,
        url: obj.url,
    };
}

export function newDocument(obj: any): Document {
    return {
        expiry: new Date(obj.expiry),
        url: obj.url,
    };
}

export function newDocumentsWithType(obj: any): DocumentWithType[] {
    if (!Array.isArray(obj)) {
        return [];
    }
    return obj.map((elem: any) => newDocumentWithType(elem));
}

export function newDocuments(obj: any): Document[] {
    if (!Array.isArray(obj)) {
        return [];
    }
    return obj.map((elem: any) => newDocument(elem));
}

/**
 * Source document information
 */
export function newSourceDocument(obj: any): SourceDocument {
    return {
        content_type: obj.content_type,
        name: obj.name,
        size: parseInt(obj.size, 10),
    };
}

/**
 * Extraction
 */

/**
 * Extraction job
 */
export function newExtractionJob(obj: any): ExtractionJob {
    return {
        id: obj.id,
        user_id: obj.user_id,
        document_id: obj.document_id,
        status: obj.status,
        tags: obj.tags,
        source_document: newSourceDocument(obj.source_document),
        created_at: new Date(obj.created_at),
        updated_at: new Date(obj.updated_at),
    };
}

/**
 * Extraction jobs
 */
export function newExtractionJobs(obj: any): PaginatedExtractionJobs {
    if (!Array.isArray(obj.jobs) || typeof obj.pagination_status !== 'object') {
        return {
            jobs: [],
            pagination_status: newPaginationStatus(),
        };
    }
    return {
        jobs: obj.jobs.map((elem: any) => newExtractionJob(elem)),
        pagination_status: newPaginationStatus(obj.pagination_status),
    };
}

/**
 * Job jobFields
 */
export function newDatatypeMatch(obj: any): DatatypeMatch {
    return {
        capture: obj.capture,
        match: obj.match,
        name: obj.name,
    };
}

export function newDatatypeMatches(obj: any): {[index: string]: DatatypeMatch} {
    const resp: {[index: string]: DatatypeMatch} = {};
    Object.entries(obj).forEach(([k, v]: [string, any]) => {
        resp[k] = newDatatypeMatch(v);
    });
    return resp;
}

export function newExtractionJobField(obj: any): ExtractionJobField {
    return {
        field_id: obj.field_id,
        datatypes_matches: newDatatypeMatches(obj.datatypes_matches),
        name: obj.name,
        values: obj.values || [],
    };
}

export function newExtractionJobFields(obj: any[]): ExtractionJobField[] {
    if (!Array.isArray(obj)) {
        return [];
    }
    return obj.map((elem: any) => newExtractionJobField(elem));
}

export function newRenderingJobField(obj: any): RenderingJobField {
    return {
        field_id: obj.field_id,
        values: obj.values || [],
    };
}

export function newRenderingJobFields(obj: any[]): RenderingJobField[] {
    if (!Array.isArray(obj)) {
        return [];
    }
    return obj.map((elem: any) => newRenderingJobField(elem));
}

/**
 * Job creation response
 */
export function newCreatedJob(obj: any): CreatedJob {
    return {
        id: obj.id,
        expiry: new Date(obj.expiry),
        document_name: obj.document_name,
        content_type: obj.content_type,
        url: obj.url,
    };
}

/**
 * Job extraction response
 */
export function newCSVExtractionUrl(obj: any): CSVExtractionUrl {
    return {
        url: obj.url,
        expiry: new Date(obj.expiry),
    };
}

/**
 * Extraction batch
 */
/**
 * Extraction batch creation result
 */
export function newCreatedBatch(obj: any): CreatedBatch {
    return {
        batch_id: obj.batch_id,
        document_id: obj.document_id,
        jobs: obj.jobs?.map((elem: any) => newCreatedJob(elem)) || [],
        size: parseInt(obj.size, 10),
    };
}

/**
 * Extraction batch response
 */
export function newBatch(obj: any): Batch {
    return {
        batch_id: obj.batch_id,
        document_id: obj.document_id,
        created_at: new Date(obj.created_at),
        job_error_count: parseInt(obj.job_error_count, 10),
        job_pending_count: parseInt(obj.job_pending_count, 10),
        job_success_count: parseInt(obj.job_success_count, 10),
        jobs: obj.jobs?.map((elem: any) => parseInt(elem, 10)) || [],
        size: parseInt(obj.size, 10),
    };
}

/**
 * Multiple extraction batch response
 */
export function newBatches(obj: any): Batches {
    return {
        batches: obj.batches?.map((elem: any) => newBatch(elem)) || [],
        pagination_status: newPaginationStatus(obj.pagination_status),
    };
}

/**
 * Extraction batch output response
 */
function newJobOutputFromBatch(obj: any): JobOutputFromBatch {
    return {
        job_id: obj.job_id,
        status: obj.status,
        fields: obj.fields?.map((elem: any) => newExtractionJobField(elem)) || [],
    };
}
export function newBatchOutput(obj: any): BatchOutput {
    return {
        batch_id: obj.batch_id,
        job_error_count: parseInt(obj.job_error_count, 10),
        job_pending_count: parseInt(obj.job_pending_count, 10),
        job_success_count: parseInt(obj.job_success_count, 10),
        pagination_status: newPaginationStatus(obj.pagination_status),
        results: obj.results?.map((elem: any) => newJobOutputFromBatch(elem)) || [],
    };
}

/**
 * Extraction batch in CSV
 */
export function newExtractionBatchCSV(obj: any): ExtractionBatchCSV {
    return {
        url: obj.url,
        expiry: new Date(obj.expiry),
        job_error_count: parseInt(obj.job_error_count, 10),
        job_pending_count: parseInt(obj.job_pending_count, 10),
        job_success_count: parseInt(obj.job_success_count, 10),
    };
}

/**
 * Rendering
 */

/**
 * Rendering job
 */
export function newRenderingJob(obj: any): RenderingJob {
    return {
        id: obj.id,
        user_id: obj.user_id,
        document_id: obj.document_id,
        status: obj.status,
        created_at: new Date(obj.created_at),
        updated_at: new Date(obj.updated_at),
    };
}

/**
 * Rendering jobs
 */
export function newRenderingJobs(obj: any): PaginatedRenderingJobs {
    if (!Array.isArray(obj.jobs) || typeof obj.pagination_status !== 'object') {
        return {
            jobs: [],
            pagination_status: newPaginationStatus(),
        };
    }
    return {
        jobs: obj.jobs.map((elem: any) => newRenderingJob(elem)),
        pagination_status: newPaginationStatus(obj.pagination_status),
    };
}
