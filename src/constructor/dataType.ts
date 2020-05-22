import { DataType, DataTypeLinks } from '..';

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
        id: parseInt(obj.id, 10),
        name: obj.name,
        updated_at: new Date(obj.updated_at),
        user_id: obj.user_id,
        validator: obj.validator,
    };
}

export function newDataTypes(obj: any[]): DataType[] {
    if (!Array.isArray(obj)) {
        return [];
    }
    return obj.map((elem: any) => newDataType(elem));
}

export function newDataTypeLinks(obj: any): DataTypeLinks {
    return {
        data_fields: obj.data_fields?.map((elem: string) => parseInt(elem, 0)) || [],
    };
}
