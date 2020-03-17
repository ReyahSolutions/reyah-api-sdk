import { dispatchError, Service } from '..';
import * as DataModel from '../types/dataModel';
import { reyahServiceRequest } from '../core/core';
import { ReyahError } from '../types/reyah';

/**
 * Data model service controller
 */
export class DataModelService implements Service {
    readonly subpath = '/datamodel';

    /**
     * Remote service status
     * @return whether the service is alive or not
     */
    public async alive(): Promise<boolean> {
        const subpath: string = `${this.subpath}/health`;
        try {
            await reyahServiceRequest.get(subpath, false);
            return true;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Available data model fields
     * @return Available data model in tabular form
     */
    public async fields(): Promise<DataModel.DataModel[]> {
        const subpath: string = `${this.subpath}/fields`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return resp.data.fields as DataModel.DataModel[];
        } catch (err) {
            throw new ReyahError(err);
        }
    }

    /**
     * Retrieves a data model of an user
     * @param uuid Data model uuid
     * @return A promise of the result of the data model retrieving transaction
     */
    public async retrieve(uuid: string): Promise<DataModel.DataModel> {
        const subpath: string = `${this.subpath}/models/${uuid}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return resp.data as DataModel.DataModel;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves all data models of an user
     * @return A promise of the result of the data model retrieving transaction
     */
    public async retrieveAll(): Promise<DataModel.DataModel[]> {
        const subpath: string = `${this.subpath}/models`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return resp.data.models as DataModel.DataModel[];
        } catch (err) {
            throw new ReyahError(err);
        }
    }

    /**
     * Creates a new data model associated with an user
     * @param model The model to create
     * @return A promise of the result of the data model creation transaction
     */
    public async create(model: DataModel.DataModel): Promise<DataModel.DataModel> {
        const subpath: string = `${this.subpath}/models`;
        try {
            const resp = await reyahServiceRequest.post(subpath, model, true);
            return resp.data as DataModel.DataModel;
        } catch (err) {
            throw new ReyahError(err);
        }
    }

    /**
     * Patches an existing model
     * @param model The modified model to patch
     * @return A promise of the result of the data model patching transaction
     */
    public async patch(model: DataModel.DataModel): Promise<DataModel.DataModel> {
        const subpath: string = `${this.subpath}/models/${model.uuid}`;
        try {
            const resp = await reyahServiceRequest.patch(subpath, model, true);
            return resp.data as DataModel.DataModel;
        } catch (err) {
            throw new ReyahError(err);
        }
    }

    /**
     * Deletes an existing model
     * @param uuid The data model uuid to delete
     * @return A promise of the result of the data model deletion transaction
     */
    public async delete(uuid: string): Promise<boolean> {
        const subpath: string = `${this.subpath}/models/${uuid}`;
        try {
            await reyahServiceRequest.delete(subpath, true);
            return true;
        } catch (err) {
            throw new ReyahError(err);
        }
    }
}

export const dataModel = new DataModelService();
export default dataModel;
