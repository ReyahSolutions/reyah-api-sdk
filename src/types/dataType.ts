/**
 * Data Document service types
 */

/**
 * Document model
 */
export interface DataType {
    id: number;
    user_id: string;
    name: string;
    description: string;
    validator: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateDataTypeRequest {
    name: string;
    description?: string;
    validator: string;
}

export interface UpdateDataTypeRequest {
    id: number;
    name: string;
    description?: string;
    validator: string;
}

export interface DataTypeLinks {
    data_fields: number[],
}
