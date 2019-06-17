import { Service } from "../types/reyah";
import * as DataModel from "../types/dataModel";
import { reyahError, reyahServiceRequest } from "../core/core";
import { ReyahRequestConfiguration, ReyahRequestResponse } from "../types/core";
import config from "../../reyah";
import { ServiceUnavailable } from "../types/errors";

/**
 * Data model management service
 */

const DATA_MODEL_PROTOCOL = config.dataModel.DATA_MODEL_PROTOCOL;
const DATA_MODEL_HOSTNAME = config.dataModel.DATA_MODEL_HOSTNAME;
const DATA_MODEL_PORT = config.dataModel.DATA_MODEL_PORT;
const DATA_MODEL_VERSION = config.dataModel.DATA_MODEL_VERSION;

/**
 * Meta request configuration
 */
class MetaRequestConfiguration implements ReyahRequestConfiguration {
    readonly protocol: string = DATA_MODEL_PROTOCOL;
    readonly hostname: string = DATA_MODEL_HOSTNAME;
    readonly port: string = DATA_MODEL_PORT;

    /**
     * Request configuration base path
     * @return A path
     */
    get basePath(): string {
        return `${this.protocol}://${this.hostname}:${this.port}`;
    }
}

/**
 * Data model service request configuration
 */
class ServiceRequestConfiguration extends MetaRequestConfiguration {
    readonly version: string = DATA_MODEL_VERSION;

    /**
     * Request configuration base path
     * @return A path
     */
    get basePath(): string {
        return `${super.basePath}/${this.version}`;
    }
}

/**
 * Data model service controller
 */
export class DataModelService implements Service {
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
            throw new ServiceUnavailable();
        }
    }

    /**
     * Available data model fields
     * @return Available data model in tabular form
     */
    public async fields(): Promise<DataModel.DataModel[]> {
        try {
            const subpath: string = "/fields";
            const resp: ReyahRequestResponse = await reyahServiceRequest.get(this.serviceRequestConfiguration, subpath);
            return resp.data.fields as DataModel.DataModel[];
        } catch(err) {
            throw new reyahError(err);
        }
    }

    /**
     * Retrieves a data model of an user
     * @param uuid Data model uuid
     * @return A promise of the result of the data model retrieving transaction
     */
    public async retrieve(uuid: string): Promise<DataModel.DataModel> {
        try {
            const subpath: string = `/models/${uuid}`;
            const resp: ReyahRequestResponse = await reyahServiceRequest.get(this.serviceRequestConfiguration, subpath);
            return resp.data as DataModel.DataModel;
        } catch(err) {
            throw new reyahError(err);
        }
    }

    /**
     * Retrieves all data models of an user
     * @return A promise of the result of the data model retrieving transaction
     */
    public async retrieveAll(): Promise<DataModel.DataModel[]> {
        const subpath: string = "/models";
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.get(this.serviceRequestConfiguration, subpath);
            return resp.data.models as DataModel.DataModel[];
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Creates a new data model associated with an user
     * @param model The model to create
     * @return A promise of the result of the data model creation transaction
     */
    public async create(model: DataModel.DataModel): Promise<DataModel.DataModel> {
        const subpath: string = "/models";
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.post(this.serviceRequestConfiguration, subpath, model);
            return resp.data as DataModel.DataModel;
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Patches an existing model
     * @param model The modified model to patch
     * @return A promise of the result of the data model patching transaction
     */
    public async patch(model: DataModel.DataModel): Promise<DataModel.DataModel> {
        const subpath: string = `/models/${model.uuid}`;
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.patch(this.serviceRequestConfiguration, subpath, model);
            return resp.data as DataModel.DataModel;
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Deletes an existing model
     * @param uuid The data model uuid to delete
     * @return A promise of the result of the data model deletion transaction
     */
    public async delete(uuid: string): Promise<boolean> {
        const subpath: string = `/models/${uuid}`;
        try {
            await reyahServiceRequest.delete(this.serviceRequestConfiguration, subpath);
            return true;

        } catch (err) {
            throw new reyahError(err);
        }
    }
}

export const dataModel = new DataModelService();
export default dataModel;
