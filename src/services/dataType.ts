import { dispatchError, ReyahError, Service } from '..';
import { reyahServiceRequest } from '../core/core';
import * as DataType from '../types/dataType';
import * as Status from '../types/status';
import { Filter } from '../types/filter';

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
            return resp.data as Status.ServiceStatus;
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
            return resp.data as DataType.DataType;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves all data types of an user
     * @return A promise of the result of the data type retrieving transaction
     */
    public async retrieveAll(filter?: Filter): Promise<DataType.DataType[]> {
        let subpath: string = `${this.subpath}/types`;
        if (filter) {
            const qs = new URLSearchParams();
            qs.append('only', filter.only.join(','));
            subpath += `?${qs.toString()}`;
        }
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return resp.data.data_types as DataType.DataType[];
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Creates a new data type associated with an user
     * @param type The type to create
     * @return A promise of the result of the data type creation transaction
     */
    public async create(type: DataType.DataType): Promise<DataType.DataType> {
        const subpath: string = `${this.subpath}/types`;
        try {
            const resp = await reyahServiceRequest.post(subpath, type, true);
            return resp.data as DataType.DataType;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Patches an existing type
     * @param type The modified type to patch
     * @return A promise of the result of the data type patching transaction
     */
    public async patch(type: DataType.DataType): Promise<DataType.DataType> {
        const subpath: string = `${this.subpath}/types/${type.id}`;
        try {
            const resp = await reyahServiceRequest.patch(subpath, type, true);
            return resp.data as DataType.DataType;
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
}

export const dataType = new DataTypeService();
export default dataType;
