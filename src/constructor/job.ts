import {
    CreatedJob,
    CSVExtractionUrl,
    DatatypeMatch,
    Document,
    Job,
    PaginatedJobs,
    JobField, CreatedBatch, Batch, Batches, BatchOutput, JobOutputFromBatch, ExtractionBatchCSV,
} from '..';
import newPaginationStatus from './pagination';

/**
 * Document recovery response format
 */
export function newDocument(obj: any): Document {
    return {
        expiry: new Date(obj.expiry),
        content_type: obj.content_type,
        url: obj.url,
    };
}

/**
 * Job
 */
export function newJob(obj: any): Job {
    return {
        id: parseInt(obj.id, 10),
        document_id: obj.document_id,
        status: obj.status,
        tags: obj.tags,
        created_at: new Date(obj.created_at),
        updated_at: new Date(obj.updated_at),
    };
}

/**
 * Jobs
 */
export function newJobs(obj: any): PaginatedJobs {
    if (!Array.isArray(obj.jobs) || typeof obj.pagination_status !== 'object') {
        return {
            jobs: [],
            pagination_status: newPaginationStatus(),
        };
    }
    return {
        jobs: obj.jobs.map((elem: any) => newJob(elem)),
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

export function newDatatypeMatches(obj: any): {[index: number]: DatatypeMatch} {
    const resp: {[index: number]: DatatypeMatch} = {};
    Object.entries(obj).forEach(([k, v]: [string, any]) => {
        resp[parseInt(k, 10)] = newDatatypeMatch(v);
    });
    return resp;
}

export function newJobField(obj: any): JobField {
    return {
        field_id: obj.field_id,
        datatypes_matches: newDatatypeMatches(obj.datatypes_matches),
        name: obj.name,
        values: obj.values || [],
    };
}

export function newJobFields(obj: any[]): JobField[] {
    if (!Array.isArray(obj)) {
        return [];
    }
    return obj.map((elem: any) => newJobField(elem));
}

/**
 * Job creation response
 */
export function newCreatedJob(obj: any): CreatedJob {
    return {
        id: parseInt(obj.id, 10),
        expiry: new Date(obj.expiry),
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
        batch_id: parseInt(obj.batch_id, 10),
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
        batch_id: parseInt(obj.batch_id, 10),
        document_id: parseInt(obj.document_id, 10),
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
        job_id: parseInt(obj.job_id, 10),
        status: obj.status,
        fields: obj.fields?.map((elem: any) => newJobField(elem)) || [],
    };
}
export function newBatchOutput(obj: any): BatchOutput {
    return {
        batch_id: parseInt(obj.batch_id, 10),
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
