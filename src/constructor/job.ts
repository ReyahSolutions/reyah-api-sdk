import {
    CreatedJob,
    CSVExtractionUrl,
    DatatypeMatch,
    DocumentWithType,
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
    ExtractionJobOuput,
    SimpleExtractionJob,
    SimpleExtractionJobField,
    SimpleExtractionJobElementField,
    SimpleExtractionJobTableField,
    SimpleValue,
    SimpleExtractionJobTableColumnField,
} from '..';
import { ExtractionJobElementField, ExtractionJobTableField, ExtractionJobTableColumnField } from '../types/job';
import { newBoundingBox } from './documentModel';
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

export function newDocumentsWithType(obj: any): DocumentWithType[] {
    if (!Array.isArray(obj)) {
        return [];
    }
    return obj.map(newDocumentWithType);
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
        document_version: obj.document_version,
        status: obj.status,
        tags: obj.tags,
        source_document: newSourceDocument(obj.source_document),
        created_at: new Date(obj.created_at),
        updated_at: new Date(obj.updated_at),
    };
}

/**
 * SimpleExtractionJob
 */

export function newSimpleValue(obj: any): SimpleValue {
    return { value: obj.value };
}

export function newSimpleExtractionJobTableColumnField(obj: any): SimpleExtractionJobTableColumnField {
    return {
        id: obj.id,
        values: obj.values.map((value: any) => newSimpleValue(value)),
        datatypeMatch: obj.datatypeMatch,
    };
}

export function newSimpleExtractionJobElementField(obj: any): SimpleExtractionJobElementField {
    return {
        values: obj.values.map((value: any) => newSimpleValue(value)),
        datatypeMatch: obj.datatypeMatch,
    };
}

export function newSimpleExtractionJobTableField(obj: any): SimpleExtractionJobTableField {
    const columns:SimpleExtractionJobTableColumnField[] = obj.columns.map((column: any) => newSimpleExtractionJobTableColumnField(column));
    return { columns };
}

export function newSimpleExtractionJobField(obj: any): SimpleExtractionJobField {
    const extractionJobField:SimpleExtractionJobField = {
        name: obj.name,
        element: undefined,
        table: undefined,
    };

    if (obj.element !== undefined) {
        extractionJobField.element = newSimpleExtractionJobElementField(obj.element);
    }

    if (obj.table !== undefined) {
        extractionJobField.table = newSimpleExtractionJobTableField(obj.table);
    }
    return (extractionJobField);
}

export function newSimpleExtractionJob(obj: any): SimpleExtractionJob {
    const extractionResult:{ [key:string]:SimpleExtractionJobField } = {};
    Object.entries(obj.extraction_result).forEach((entry) => {
        extractionResult[entry[0]] = newSimpleExtractionJobField(entry[1]);
    });
    return {
        id: obj.job_id,
        user_id: obj.user_id,
        status: obj.status,
        created_at: new Date(obj.created_at),
        updated_at: new Date(obj.updated_at),
        extraction_result: extractionResult,
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
 * Job extraction output
 */
export function newDatatypeMatch(obj: any): DatatypeMatch {
    return {
        capture: obj.capture,
        match: obj.match,
        name: obj.name,
    };
}

export function newDatatypeMatches(obj: any): { [index: string]: DatatypeMatch } {
    return Object.entries(obj)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: newDatatypeMatch(v) }), {});
}

export function newExtractionJobElementField(obj: any): ExtractionJobElementField {
    return {
        values: obj.values || [],
        datatypes_matches: newDatatypeMatches(obj.datatypes_matches),
    };
}

export function newExtractionJobTableColumnField(obj: any): ExtractionJobTableColumnField {
    return {
        id: obj.id,
        datafield_id: obj.datafield_id,
        values: obj.values || [],
        datatypes_matches: newDatatypeMatches(obj.datatypes_matches),
    };
}

export function newExtractionJobTableField(obj: any): ExtractionJobTableField {
    return {
        columns: obj.columns && obj.columns.map(newExtractionJobTableColumnField),
    };
}

export function newExtractionJobField(obj: any): ExtractionJobField {
    return {
        field_id: obj.field_id,
        name: obj.name,
        anchor: newBoundingBox(obj.anchor),
        gather_box: newBoundingBox(obj.gather_box),
        table: obj.table && newExtractionJobTableField(obj.table),
        element: obj.element && newExtractionJobElementField(obj.element),
    };
}

export function newExtractionJobFields(obj: any[]): ExtractionJobField[] {
    if (!Array.isArray(obj)) {
        return [];
    }
    return obj.map(newExtractionJobField);
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
    return obj.map(newRenderingJobField);
}
export function newExtractionJobOuput(obj: any): ExtractionJobOuput {
    return {
        fields: newExtractionJobFields(obj.fields),
        stoppers: obj.stoppers.map((elem: any) => newBoundingBox(elem)),
    };
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
        jobs: obj.jobs?.map(newCreatedJob) || [],
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
        batches: obj.batches?.map(newBatch) || [],
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
        fields: obj.fields?.map(newExtractionJobField) || [],
    };
}
export function newBatchOutput(obj: any): BatchOutput {
    return {
        batch_id: obj.batch_id,
        job_error_count: parseInt(obj.job_error_count, 10),
        job_pending_count: parseInt(obj.job_pending_count, 10),
        job_success_count: parseInt(obj.job_success_count, 10),
        pagination_status: newPaginationStatus(obj.pagination_status),
        results: obj.results?.map(newJobOutputFromBatch) || [],
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
        document_version: obj.document_version,
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
        jobs: obj.jobs.map(newRenderingJob),
        pagination_status: newPaginationStatus(obj.pagination_status),
    };
}
