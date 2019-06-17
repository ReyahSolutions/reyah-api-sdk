import * as Job from "../types/job";
import { Service } from "../types/reyah";
import { reyahServiceRequest, reyahError } from "../core/core";
import { ReyahRequestConfiguration, ReyahRequestResponse } from "../types/core";
import config from "../../reyah";

/**
 * job management service
 */

const JOB_MODEL_PROTOCOL = config.job.JOB_MODEL_PROTOCOL;
const JOB_MODEL_HOSTNAME = config.job.JOB_MODEL_HOSTNAME;
const JOB_MODEL_PORT = config.job.JOB_MODEL_PORT;
const JOB_MODEL_VERSION = config.job.JOB_MODEL_VERSION;

/**
 * Meta request configuration
 */
class MetaRequestConfiguration implements ReyahRequestConfiguration {
    readonly protocol: string = JOB_MODEL_PROTOCOL;
    readonly hostname: string = JOB_MODEL_HOSTNAME;
    readonly port: string = JOB_MODEL_PORT;

    /**
     * Request configuration base path
     * @return A path
     */
    get basePath(): string {
        return `${this.protocol}://${this.hostname}:${this.port}`;
    }
}

/**
 * Job service request configuration
 */
class ServiceRequestConfiguration extends MetaRequestConfiguration {
    readonly version: string = JOB_MODEL_VERSION;

    /**
     * Request configuration base path
     * @return A path
     */
    get basePath(): string {
        return `${super.basePath}/${this.version}`;
    }
}

/**
 * Job service controller
 */
export class JobService implements Service {
    private serviceRequestConfiguration: ReyahRequestConfiguration = new ServiceRequestConfiguration();
    private metaRequestConfiguration: ReyahRequestConfiguration = new MetaRequestConfiguration();

    /**
     * Remote service status
     * @return whether the service is alive or not
     */
    public async alive(): Promise<boolean> {
        const subpath: string = "/healthz";
        try {
            await reyahServiceRequest.get(this.metaRequestConfiguration, subpath);
            return true;
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Retrieves an extraction job of an user
     * @param uuid Extraction job uuid
     * @return A promise of the result of the extraction job retrieving transaction
     */
    public async retrieveExtractionJob(uuid: string): Promise<Job.Job> {
        const subpath: string = `/extraction/jobs/${uuid}`;
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.get(this.serviceRequestConfiguration, subpath);
            return resp.data as Job.Job;
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Retrieves all extraction jobs of an user
     * @return A promise of the result of the extraction job retrieving transaction
     */
    public async retrieveAllExtractionJob(): Promise<Job.Job[]> {
        const subpath: string = "/extraction/jobs";
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.get(this.serviceRequestConfiguration, subpath);
            return resp.data.jobs as Job.Job[];
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Retrieves output of an extraction job of an user
     * @param uuid Extraction job uuid
     * @return A promise of the result of the extraction job output retrieving transaction
     */
    public async retrieveExtractionJobOutput(uuid: string): Promise<Job.JobField[]> {
        const subpath: string = `/extraction/jobs/${uuid}/output`;
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.get(this.serviceRequestConfiguration, subpath);
            return resp.data as Job.JobField[];
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Creates a new extraction job associated with an user
     * @param job Extraction job to create
     * @return A promise of the result of the extraction job creation transaction
     */
    public async createExtractionJob(job: Job.CreateJob): Promise<Job.NewJob> {
        const subpath: string = "/extraction/jobs";
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.post(this.serviceRequestConfiguration, subpath, job);
            return resp.data as Job.NewJob;
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Retrieves a rendering job of an user
     * @param uuid Rendering job uuid
     * @return A promise of the result of the rendering job retrieving transaction
     */
    public async retrieveRenderJob(uuid: string): Promise<Job.Job> {
        const subpath: string = `/extraction/jobs/${uuid}`;
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.get(this.serviceRequestConfiguration, subpath);
            return resp.data as Job.Job;
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Retrieves all rendering jobs of an user
     * @return A promise of the result of the rendering job retrieving transaction
     */
    public async retrieveAllRenderJob(): Promise<Job.Job[]> {
        const subpath: string = "/rendering/jobs";
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.get(this.serviceRequestConfiguration, subpath);
            return resp.data as Job.Job[];
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Retrieves output of an rendering job of an user
     * @param uuid Rendering job uuid
     * @return A promise of the result of the rendering job output retrieving transaction
     */
    public async retrieveRenderJobOutput(uuid: string): Promise<Job.Document> {
        const subpath: string = `/extraction/jobs/${uuid}/output`;
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.get(this.serviceRequestConfiguration, subpath);
            return resp.data as Job.Document;
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Creates a new rendering job associated with an user
     * @param job Rendering job to create
     * @return A promise of the result of the rendering job creation transaction
     */
    public async createRenderJob(job: Job.CreateJob): Promise<Job.NewJob> {
        const subpath: string = "/extraction/jobs";
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.post(this.serviceRequestConfiguration, subpath, job);
            return resp.data as Job.NewJob;
        } catch (err) {
            throw new reyahError(err);
        }
    }
}

export const job = new JobService();
export default job;
