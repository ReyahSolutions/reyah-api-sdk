import * as Job from '../types/job';
import { CSVExtractionBatchRequest, InputType, InternalCSVExtractionBatchRequest } from '../types/job';
import { Service } from '../types/reyah';
import { reyahServiceRequest } from '../core/core';
import { dispatchError } from '../core/errors';
import * as Status from '../types/status';
import newServiceStatus from '../constructor/status';
import {
    newBatch,
    newBatches,
    newBatchOutput,
    newCreatedBatch,
    newCreatedJob,
    newCSVExtractionUrl,
    newDocuments,
    newExtractionBatchCSV,
    newExtractionJob,
    newExtractionJobFields,
    newExtractionJobs,
    newRenderingJob,
    newRenderingJobFields,
    newRenderingJobs,
} from '../constructor/job';
import { Pagination } from '../types/pagination';

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
    public async retrieveExtractionJob(id: string): Promise<Job.ExtractionJob> {
        const subpath: string = `${this.subpath}/extraction/jobs/${id}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newExtractionJob(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves all extraction jobs of an user
     * @return A promise of the result of the extraction job retrieving transaction
     */
    public async retrieveAllExtractionJob(pagination?: Pagination): Promise<Job.PaginatedExtractionJobs> {
        let subpath: string = `${this.subpath}/extraction/jobs`;
        const qs = new URLSearchParams();
        if (pagination) {
            qs.append('page', pagination.page.toString());
            qs.append('size', pagination.size.toString());
        }
        const queryParams = qs.toString();
        if (queryParams) {
            subpath += `?${queryParams}`;
        }
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newExtractionJobs(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves input of an extraction job of an user
     * @param id Extraction job id
     * @param inputType Input type required
     * @return A promise of the result of the extraction job input retrieving transaction
     */
    public async retrieveExtractionJobInput(id: string, inputType: InputType = InputType.SOURCE): Promise<Job.Document[]> {
        const subpath: string = `${this.subpath}/extraction/jobs/${id}/input`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true, { type: inputType });
            return newDocuments(resp.data.documents);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves output of an extraction job of an user
     * @param id Extraction job id
     * @return A promise of the result of the extraction job output retrieving transaction
     */
    public async retrieveExtractionJobOutput(id: string): Promise<Job.ExtractionJobField[]> {
        const subpath: string = `${this.subpath}/extraction/jobs/${id}/output`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newExtractionJobFields(resp.data.fields);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Creates a new extraction job associated with an user
     * @param job Extraction job to create
     * @return A promise of the result of the extraction job creation transaction
     */
    public async createExtractionJob(job: Job.CreateExtractionJobRequest): Promise<Job.CreatedJob> {
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
    public async retrieveRenderJob(id: string): Promise<Job.RenderingJob> {
        const subpath: string = `${this.subpath}/rendering/jobs/${id}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newRenderingJob(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves all rendering jobs of an user
     * @return A promise of the result of the rendering job retrieving transaction
     */
    public async retrieveAllRenderJob(pagination?: Pagination): Promise<Job.PaginatedRenderingJobs> {
        let subpath: string = `${this.subpath}/rendering/jobs`;
        const qs = new URLSearchParams();
        if (pagination) {
            qs.append('page', pagination.page.toString());
            qs.append('size', pagination.size.toString());
        }
        const queryParams = qs.toString();
        if (queryParams) {
            subpath += `?${queryParams}`;
        }
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newRenderingJobs(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves input of an rendering job of an user
     * @param id Rendering job id
     * @return A promise of the result of the rendering job input retrieving transaction
     */
    public async retrieveRenderJobInput(id: string): Promise<Job.RenderingJobField[]> {
        const subpath: string = `${this.subpath}/rendering/jobs/${id}/input`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newRenderingJobFields(resp.data.fields);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves output of an rendering job of an user
     * @param id Rendering job id
     * @return A promise of the result of the rendering job output retrieving transaction
     */
    public async retrieveRenderJobOutput(id: string): Promise<Job.Document[]> {
        const subpath: string = `${this.subpath}/rendering/jobs/${id}/output`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newDocuments(resp.data.documents);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Creates a new rendering job associated with an user
     * @param job Rendering job to create
     * @return A promise of the result of the rendering job creation transaction
     */
    public async createRenderJob(job: Job.CreateRenderingJobRequest): Promise<Job.CreatedJob> {
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

    /**
     * Extraction batch
     */
    /**
     * createExtractionBatch creates a new extraction batch
     * @param createRequest Parameter of the batch
     * @return A promise of the result of the extraction batch creation
     */
    public async createExtractionBatch(createRequest: Job.CreateExtractionBatchRequest): Promise<Job.CreatedBatch> {
        const subpath: string = `${this.subpath}/extraction/batch`;
        try {
            const resp = await reyahServiceRequest.post(subpath, createRequest, true);
            return newCreatedBatch(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * retrieveExtractionBatch returns an extraction batch specified by its id
     * @param batchId The id of the extraction batch
     * @return A promise of the result of the extraction batch retrieving transaction
     */
    public async retrieveExtractionBatch(batchId: string): Promise<Job.Batch> {
        const subpath: string = `${this.subpath}/extraction/batch/${batchId}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newBatch(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * retrieveAllExtractionBatch returns all the extraction of the user
     * @return A promise of the result of the extraction batch retrieving transaction
     */
    public async retrieveAllExtractionBatch(pagination?: Pagination): Promise<Job.Batches> {
        const subpath: string = `${this.subpath}/extraction/batch`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true, pagination);
            return newBatches(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * retrieveExtractionBatchOutput returns the outputs of an extraction batch
     * @param batchId The id of the extraction batch
     * @param pagination The pagination status
     * @return A promise of the result of the extraction batch output retrieving transaction
     */
    public async retrieveExtractionBatchOutput(batchId: string, pagination?: Pagination): Promise<Job.BatchOutput> {
        const subpath: string = `${this.subpath}/extraction/batch/${batchId}/outputs`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true, pagination);
            return newBatchOutput(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * retrieveExtractionBatchCSV returns the outputs of an extraction batch under a CSV file
     * @param csvRequest The parameter of the CSV extraction result
     * @return A promise of the result of the extraction batch CSV exportation retrieving transaction
     */
    public async retrieveExtractionBatchCSV(csvRequest: CSVExtractionBatchRequest): Promise<Job.ExtractionBatchCSV> {
        const subpath: string = `${this.subpath}/extraction/batch/${csvRequest.batch_id}/csv`;
        try {
            const request: InternalCSVExtractionBatchRequest = {
                include_datatype: csvRequest.include_datatype,
            };
            const resp = await reyahServiceRequest.get(subpath, true, request);
            return newExtractionBatchCSV(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }
}

export const job = new JobService();
export default job;
