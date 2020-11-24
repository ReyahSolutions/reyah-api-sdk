/**
 * Data Types service types
 */

import { PaginationStatus } from './pagination';

/**
 * Data Types
 */
export interface DataType {
    id: string;
    user_id: string;
    name: string;
    description: string;
    validator: string;
    created_at: Date;
    updated_at: Date;
}

export interface PaginatedDataTypes {
    data_types: DataType[],
    pagination_status?: PaginationStatus,
}

export interface CreateDataTypeRequest {
    name: string;
    description?: string;
    validator: string;
}

export interface UpdateDataTypeRequest {
    id: string;
    name: string;
    description?: string;
    validator: string;
}

export interface DataTypeLinks {
    data_fields: string[],
}
