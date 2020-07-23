import {
    CreatedJob,
    CSVExtractionUrl,
    DatatypeMatch,
    Document,
    Job,
    PaginatedJobs,
    JobField,
} from '..';

/**
 * Document recovery response format
 */
export function newDocument(obj: any): Document {
    return {
        expiry: new Date(obj.expiry),
        url: obj.url,
    };
}

/**
 * Job
 */
export function newJob(obj: any): Job {
    return {
        id: parseInt(obj.id, 10),
        document_id: parseInt(obj.document_id, 10),
        status: obj.status,
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
            pagination_status: {
                page_size: 0,
                total_pages: 0,
                total_entries: 0,
                current_size: 0,
                current_page: 0,
            },
        };
    }
    return {
        jobs: obj.jobs.map((elem: any) => newJob(elem)),
        pagination_status: {
            page_size: parseInt(obj.pagination_status.page_size, 10),
            total_pages: parseInt(obj.pagination_status.total_pages, 10),
            total_entries: parseInt(obj.pagination_status.total_entries, 10),
            current_size: parseInt(obj.pagination_status.current_size, 10),
            current_page: parseInt(obj.pagination_status.current_page, 10),
        },
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
        field_id: parseInt(obj.field_id, 10),
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
