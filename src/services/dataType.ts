import {
    dispatchError, ReyahError, Service, Filter,
} from '..';
import { reyahServiceRequest } from '../core/core';
import * as DataType from '../types/dataType';
import * as Status from '../types/status';

import newServiceStatus from '../constructor/status';
import { newDataType, newDataTypeLinks, newDataTypes } from '../constructor/dataType';
import { Pagination } from '../types/pagination';

/**
 * Data type service controller
 */
export class DataTypeService implements Service {
    readonly subpath = '/datatype';

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
     * Retrieves a data type of an user
     * @param id Data type id
     * @return A promise of the result of the data type retrieving transaction
     */
    public async retrieve(id: number): Promise<DataType.DataType> {
        const subpath: string = `${this.subpath}/types/${id}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newDataType(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves all data types of an user
     * @return A promise of the result of the data type retrieving transaction
     */
    public async retrieveAll(filter?: Filter, pagination?: Pagination): Promise<DataType.PaginatedDataTypes> {
        let subpath: string = `${this.subpath}/types`;
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
            console.log(subpath);
        }
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newDataTypes(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Creates a new data type associated with an user
     * @param type The type to create
     * @return A promise of the result of the data type creation transaction
     */
    public async create(type: DataType.CreateDataTypeRequest): Promise<DataType.DataType> {
        const subpath: string = `${this.subpath}/types`;
        try {
            const resp = await reyahServiceRequest.post(subpath, type, true);
            return newDataType(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Patches an existing type
     * @param type The modified type to patch
     * @return A promise of the result of the data type patching transaction
     */
    public async patch(type: DataType.UpdateDataTypeRequest): Promise<DataType.DataType> {
        const subpath: string = `${this.subpath}/types/${type.id}`;
        try {
            const resp = await reyahServiceRequest.patch(subpath, type, true);
            return newDataType(resp.data);
        } catch (err) {
            throw new ReyahError(err);
        }
    }

    /**
     * Deletes an existing type
     * @param id The data type id to delete
     * @return A promise of the result of the data type deletion transaction
     */
    public async delete(id: number): Promise<boolean> {
        const subpath: string = `${this.subpath}/types/${id}`;
        try {
            await reyahServiceRequest.delete(subpath, true);
            return true;
        } catch (err) {
            throw new ReyahError(err);
        }
    }

    /**
     * Retrieves all data fields linked to the current data type
     * @param dataTypeId The data type id to query
     * @return A promise of the result of the retrieving transaction
     */
    public async retrieveDataTypeLinksFromDataType(dataTypeId: number): Promise<DataType.DataTypeLinks> {
        const subpath: string = `${this.subpath}/types/${dataTypeId}/links`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newDataTypeLinks(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }
}

export const dataType = new DataTypeService();
export default dataType;
