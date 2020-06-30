import * as Job from '../types/job';
import { Service } from '../types/reyah';
import { reyahServiceRequest } from '../core/core';
import { dispatchError } from '..';
import * as Status from '../types/status';
import newServiceStatus from '../constructor/status';
import {
    newCreatedJob, newCSVExtractionUrl,
    newDocument,
    newJob, newJobFields,
    newJobs,
} from '../constructor/job';

/**
 * Job service controller
 */
export class JobService implements Service {
    readonly subpath = '/job';

    /**
     * Remote service status
     * @return whether the service is alive or not
     */
    public async alive(): Promise<Status.ServiceStatus> {
        const subpath: string = `${this.subpath}/health`;
        try {
            const resp = await reyahServiceRequest.get(subpath, false);
            return newServiceStatus(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves an extraction job of an user
     * @param id Extraction job id
     * @return A promise of the result of the extraction job retrieving transaction
     */
    public async retrieveExtractionJob(id: number): Promise<Job.Job> {
        const subpath: string = `${this.subpath}/extraction/jobs/${id}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newJob(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves all extraction jobs of an user
     * @return A promise of the result of the extraction job retrieving transaction
     */
    public async retrieveAllExtractionJob(): Promise<Job.Job[]> {
        const subpath: string = `${this.subpath}/extraction/jobs`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newJobs(resp.data.jobs);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves input of an extraction job of an user
     * @param id Extraction job id
     * @return A promise of the result of the extraction job input retrieving transaction
     */
    public async retrieveExtractionJobInput(id: number): Promise<Job.Document> {
        const subpath: string = `${this.subpath}/extraction/jobs/${id}/input`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newDocument(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves output of an extraction job of an user
     * @param id Extraction job id
     * @return A promise of the result of the extraction job output retrieving transaction
     */
    public async retrieveExtractionJobOutput(id: number): Promise<Job.JobField[]> {
        const subpath: string = `${this.subpath}/extraction/jobs/${id}/output`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newJobFields(resp.data.fields);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Creates a new extraction job associated with an user
     * @param job Extraction job to create
     * @return A promise of the result of the extraction job creation transaction
     */
    public async createExtractionJob(job: Job.CreateJobRequest): Promise<Job.CreatedJob> {
        const subpath: string = `${this.subpath}/extraction/jobs`;
        try {
            const resp = await reyahServiceRequest.post(subpath, job, true);
            return newCreatedJob(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves a rendering job of an user
     * @param id Rendering job id
     * @return A promise of the result of the rendering job retrieving transaction
     */
    public async retrieveRenderJob(id: number): Promise<Job.Job> {
        const subpath: string = `${this.subpath}/extraction/jobs/${id}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newJob(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves all rendering jobs of an user
     * @return A promise of the result of the rendering job retrieving transaction
     */
    public async retrieveAllRenderJob(): Promise<Job.Job[]> {
        const subpath: string = `${this.subpath}/rendering/jobs`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newJobs(resp.data.jobs);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves input of an rendering job of an user
     * @param id Rendering job id
     * @return A promise of the result of the rendering job input retrieving transaction
     */
    public async retrieveRenderJobInput(id: number): Promise<Job.Document> {
        const subpath: string = `${this.subpath}/rendering/jobs/${id}/input`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newDocument(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves output of an rendering job of an user
     * @param id Rendering job id
     * @return A promise of the result of the rendering job output retrieving transaction
     */
    public async retrieveRenderJobOutput(id: number): Promise<Job.Document> {
        const subpath: string = `${this.subpath}/rendering/jobs/${id}/output`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newDocument(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Creates a new rendering job associated with an user
     * @param job Rendering job to create
     * @return A promise of the result of the rendering job creation transaction
     */
    public async createRenderJob(job: Job.CreateJobRequest): Promise<Job.CreatedJob> {
        const subpath: string = `${this.subpath}/rendering/jobs`;
        try {
            const resp = await reyahServiceRequest.post(subpath, job, true);
            return newCreatedJob(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Extract multiple jobs into csv file
     * @param extractionRequest Parameter of the extraction
     * @return A promise of the result of the extraction
     */
    public async exportJobCSV(extractionRequest: Job.CSVExtractionRequest): Promise<Job.CSVExtractionUrl> {
        const subpath: string = `${this.subpath}/extraction/csv`;
        try {
            const request: Job.InternalCSVExtractionRequest = {
                extraction_type: extractionRequest.extraction_type,
                include_datatype: extractionRequest.include_datatype,
            };
            if (extractionRequest.extraction_type === Job.ExtractionType.IDS) {
                request.ids = extractionRequest.ids?.join(',');
            } else if (extractionRequest.extraction_type === Job.ExtractionType.DATE) {
                request.start_date = extractionRequest.start_date?.toISOString();
                request.end_date = extractionRequest.end_date?.toISOString();
            }
            const resp = await reyahServiceRequest.get(subpath, true, request);
            return newCSVExtractionUrl(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }
}

export const job = new JobService();
export default job;
