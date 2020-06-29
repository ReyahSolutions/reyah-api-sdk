import { dispatchError, Filter, Service } from '..';
import * as DataModel from '../types/dataModel';
import { reyahServiceRequest } from '../core/core';
import { ReyahError } from '../types/reyah';
import * as Status from '../types/status';
import newServiceStatus from '../constructor/status';
import {
    newDataFieldLinks,
    newDataModel,
    newDataModelLinks,
    newPaginatedDataModels,
    newField,
    newPaginatedFields,
} from '../constructor/dataModel';
import { Pagination } from '../types/pagination';

/**
 * Data model service controller
 */
export class DataModelService implements Service {
    readonly subpath = '/datamodel';

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
            throw new ReyahError(err);
        }
    }

    /**
     * Available data model kinds
     * @return Available kinds in data fields
     */
    public async availableKinds(): Promise<string[]> {
        const subpath: string = `${this.subpath}/kinds`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return resp.data.kinds as string[];
        } catch (err) {
            throw new ReyahError(err);
        }
    }

    /**
     * Retrieves a data model of an user
     * @param modelId The data model id
     * @return A promise of the result of the data model retrieving transaction
     */
    public async retrieve(modelId: number): Promise<DataModel.DataModel> {
        const subpath: string = `${this.subpath}/models/${modelId}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newDataModel(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves all data models of an user
     * @return A promise of the result of the data model retrieving transaction
     */
    public async retrieveAll(filter?: Filter, pagination?: Pagination): Promise<DataModel.PaginatedDataModels> {
        let subpath: string = `${this.subpath}/models`;
        const qs = new URLSearchParams();
        if (filter) {
            qs.append('only', filter.only.join(','));
        }
        if (pagination) {
            qs.append('page', pagination.page.toString());
            qs.append('size', pagination.size.toString());
        }
        if (qs.toString()) {
            subpath += `?${qs.toString()}`;
        }
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newPaginatedDataModels(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Creates a new data model associated with an user
     * @param model The model to create
     * @return A promise of the result of the data model creation transaction
     */
    public async create(model: DataModel.CreateDataModelRequest): Promise<DataModel.DataModel> {
        const subpath: string = `${this.subpath}/models`;
        try {
            const resp = await reyahServiceRequest.post(subpath, model, true);
            return newDataModel(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Patches an existing model
     * @param model The modified model to patch
     * @return A promise of the result of the data model patching transaction
     */
    public async patch(model: DataModel.UpdateDataModelRequest): Promise<DataModel.DataModel> {
        const subpath: string = `${this.subpath}/models/${model.model_id}`;
        try {
            const resp = await reyahServiceRequest.patch(subpath, model, true);
            return newDataModel(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Deletes an existing model
     * @param modelId The data model id to delete
     * @return A promise of the result of the data model deletion transaction
     */
    public async delete(modelId: string): Promise<boolean> {
        const subpath: string = `${this.subpath}/models/${modelId}`;
        try {
            await reyahServiceRequest.delete(subpath, true);
            return true;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves all document models linked to the current data model
     * @param modelId The data model id to query
     * @return A promise of the result of the retrieving transaction
     */
    public async retrieveDataModelLinksFromDataModel(modelId: number): Promise<DataModel.DataModelLinks> {
        const subpath: string = `${this.subpath}/models/${modelId}/links`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newDataModelLinks(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves a data field
     * @param fieldId The ID of the field to retrieve
     * @return A promise of the result of the retrieving transaction
     */
    public async retrieveField(fieldId: number): Promise<DataModel.Field> {
        const subpath: string = `${this.subpath}/fields/${fieldId}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newField(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves all data fields
     * @return A promise of the result of the retrieving transaction
     */
    public async retrieveAllFields(): Promise<DataModel.PaginatedFields> {
        const subpath: string = `${this.subpath}/fields`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newPaginatedFields(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Creates a new data field associated with an user
     * @param field The field to create
     * @return A promise of the result of the data field creation transaction
     */
    public async createField(field: DataModel.CreateFieldRequest): Promise<DataModel.Field> {
        const subpath: string = `${this.subpath}/fields`;
        try {
            const resp = await reyahServiceRequest.post(subpath, field, true);
            return newField(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Patches an existing data field
     * @param field The data field to patch
     * @return A promise of the result of the data field patching transaction
     */
    public async patchField(field: DataModel.UpdateFieldRequest): Promise<DataModel.Field> {
        const subpath: string = `${this.subpath}/fields/${field.field_id}`;
        try {
            const resp = await reyahServiceRequest.patch(subpath, field, true);
            return newField(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Deletes an existing data field
     * @param fieldId The data field id to delete
     * @return A promise of the result of the data field deletion transaction
     */
    public async deleteField(fieldId: number): Promise<boolean> {
        const subpath: string = `${this.subpath}/fields/${fieldId}`;
        try {
            await reyahServiceRequest.delete(subpath, true);
            return true;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves all data models linked to the current field
     * @param fieldId The field id to query
     * @return A promise of the result of the retrieving transaction
     */
    public async retrieveDataFieldLinksFromDataField(fieldId: number): Promise<DataModel.DataFieldLinks> {
        const subpath: string = `${this.subpath}/fields/${fieldId}/links`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newDataFieldLinks(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }
}

export const dataModel = new DataModelService();
export default dataModel;
