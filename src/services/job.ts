import * as Job from '../types/job';
import { Service } from '../types/reyah';
import { reyahServiceRequest } from '../core/core';
import { dispatchError } from '..';
import * as Status from '../types/status';

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
            return resp.data as Status.ServiceStatus;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves an extraction job of an user
     * @param uuid Extraction job uuid
     * @return A promise of the result of the extraction job retrieving transaction
     */
    public async retrieveExtractionJob(uuid: string): Promise<Job.Job> {
        const subpath: string = `${this.subpath}/extraction/jobs/${uuid}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return resp.data as Job.Job;
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
            return resp.data.jobs as Job.Job[];
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves input of an extraction job of an user
     * @param uuid Extraction job uuid
     * @return A promise of the result of the extraction job input retrieving transaction
     */
    public async retrieveExtractionJobInput(uuid: string): Promise<Job.Document> {
        const subpath: string = `${this.subpath}/extraction/jobs/${uuid}/input`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return resp.data as Job.Document;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves output of an extraction job of an user
     * @param uuid Extraction job uuid
     * @return A promise of the result of the extraction job output retrieving transaction
     */
    public async retrieveExtractionJobOutput(uuid: string): Promise<Job.JobField[]> {
        const subpath: string = `${this.subpath}/extraction/jobs/${uuid}/output`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return resp.data.fields as Job.JobField[];
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Creates a new extraction job associated with an user
     * @param job Extraction job to create
     * @return A promise of the result of the extraction job creation transaction
     */
    public async createExtractionJob(job: Job.CreateJob): Promise<Job.NewJob> {
        const subpath: string = `${this.subpath}/extraction/jobs`;
        try {
            const resp = await reyahServiceRequest.post(subpath, job, true);
            return resp.data as Job.NewJob;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves a rendering job of an user
     * @param uuid Rendering job uuid
     * @return A promise of the result of the rendering job retrieving transaction
     */
    public async retrieveRenderJob(uuid: string): Promise<Job.Job> {
        const subpath: string = `${this.subpath}/extraction/jobs/${uuid}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return resp.data as Job.Job;
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
            return resp.data.jobs as Job.Job[];
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves input of an rendering job of an user
     * @param uuid Rendering job uuid
     * @return A promise of the result of the rendering job input retrieving transaction
     */
    public async retrieveRenderJobInput(uuid: string): Promise<Job.Document> {
        const subpath: string = `${this.subpath}/rendering/jobs/${uuid}/input`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return resp.data as Job.Document;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves output of an rendering job of an user
     * @param uuid Rendering job uuid
     * @return A promise of the result of the rendering job output retrieving transaction
     */
    public async retrieveRenderJobOutput(uuid: string): Promise<Job.Document> {
        const subpath: string = `${this.subpath}/rendering/jobs/${uuid}/output`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return resp.data as Job.Document;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Creates a new rendering job associated with an user
     * @param job Rendering job to create
     * @return A promise of the result of the rendering job creation transaction
     */
    public async createRenderJob(job: Job.CreateJob): Promise<Job.NewJob> {
        const subpath: string = `${this.subpath}/rendering/jobs`;
        try {
            const resp = await reyahServiceRequest.post(subpath, job, true);
            return resp.data as Job.NewJob;
        } catch (err) {
            throw dispatchError(err);
        }
    }
}

export const job = new JobService();
export default job;
