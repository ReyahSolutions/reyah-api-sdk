/**
 * Data Model service types
 */

/**
 * Data model field property
 */
export interface Property {
    key: string;
    value?: string;
    mandatory?: boolean;
}

/**
 * Data model field
 */
export interface Field {
    field_id?: number;
    user_id?: string;
    kind: string;
    name: string;
    description: string;
    properties?: Property[];
    datatypes?: number[];
    created_at?: Date;
    updated_at?: Date;
}

/**
 * Data model
 */
export interface DataModel {
    model_id?: number;
    user_id?: string;
    name: string;
    description?: string;
    fields?: Field[];
    created_at?: Date;
    updated_at?: Date;
}

export interface DataModelRequest {
    model_id?: number;
    name: string;
    description?: string;
    fields?: number[];
}
