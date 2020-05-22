import {
    CreatedJob, DatatypeMatch,
    Document,
    Job,
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
export function newJobs(obj: any[]): Job[] {
    if (!Array.isArray(obj)) {
        return [];
    }
    return obj.map((elem: any) => newJob(elem));
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
