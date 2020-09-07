import { DataType, DataTypeLinks, PaginatedDataTypes } from '..';
import newPaginationStatus from './pagination';

/**
 * Data Document service types
 */

/**
 * Document model
 */
export function newDataType(obj: any): DataType {
    return {
        created_at: new Date(obj.created_at),
        description: obj.description,
        id: obj.id,
        name: obj.name,
        updated_at: new Date(obj.updated_at),
        user_id: obj.user_id,
        validator: obj.validator,
    };
}

export function newDataTypes(obj: any): PaginatedDataTypes {
    if (!Array.isArray(obj.data_types) || typeof obj.pagination_status !== 'object') {
        return {
            data_types: [],
            pagination_status: newPaginationStatus(),
        };
    }
    return {
        data_types: obj.data_types.map((elem: any) => newDataType(elem)),
        pagination_status: (obj.pagination_status === null) ? undefined : newPaginationStatus(obj.pagination_status),
    };
}

export function newDataTypeLinks(obj: any): DataTypeLinks {
    return {
        data_fields: obj.data_fields?.map((elem: string) => parseInt(elem, 0)) || [],
    };
}
