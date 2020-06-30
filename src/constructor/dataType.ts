import { DataType, DataTypeLinks, PaginatedDataTypes } from '..';

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

export function newDataTypes(obj: any): PaginatedDataTypes {
    if (!Array.isArray(obj.data_types) || typeof obj.pagination_status !== 'object') {
        return {
            data_types: [],
            pagination_status: {
                page_size: 0,
                total_pages: 0,
                total_entries: 0,
                current_size: 0,
                current_page: 0,
            },
        };
    }
    return {
        data_types: obj.data_types.map((elem: any) => newDataType(elem)),
        pagination_status: {
            page_size: parseInt(obj.pagination_status.page_size, 10),
            total_pages: parseInt(obj.pagination_status.total_pages, 10),
            total_entries: parseInt(obj.pagination_status.total_entries, 10),
            current_size: parseInt(obj.pagination_status.current_size, 10),
            current_page: parseInt(obj.pagination_status.current_page, 10),
        },
    };
}

export function newDataTypeLinks(obj: any): DataTypeLinks {
    return {
        data_fields: obj.data_fields?.map((elem: string) => parseInt(elem, 0)) || [],
    };
}
