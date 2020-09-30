/**
 * Data Model service types
 */

import { PaginationStatus } from './pagination';

/**
 * Data model field property
 */
export interface Property {
    key: string;
    value: string;
}

export interface PropertyRequest {
    key: string;
    value?: string;
}

/**
 * Data model field
 */
export interface Field {
    field_id: string;
    user_id: string;
    kind: string;
    name: string;
    description: string;
    properties: Property[];
    datatypes: string[];
    created_at: Date;
    updated_at: Date;
}

export interface PaginatedFields {
    fields: Field[],
    pagination_status: PaginationStatus,
}

export interface CreateFieldRequest {
    kind: string;
    name: string;
    description?: string;
    properties?: PropertyRequest[];
    datatypes: string[];
}

export interface UpdateFieldRequest {
    field_id: string;
    kind: string;
    name: string;
    description?: string;
    properties?: PropertyRequest[];
    datatypes: string[];
}

/**
 * Data model
 */
export interface DataModel {
    model_id: string;
    user_id: string;
    name: string;
    description: string;
    fields: Field[];
    created_at: Date;
    updated_at: Date;
}

export interface PaginatedDataModels {
    models: DataModel[],
    pagination_status?: PaginationStatus,
}

export interface CreateDataModelRequest {
    name: string;
    description?: string;
    fields: string[];
}

export interface UpdateDataModelRequest {
    model_id: string;
    name: string;
    description?: string;
    fields: string[];
}

export interface FieldLink {
    datamodel_field_id: string,
    document_field_id: string[],
}

export interface DocumentLink {
    document_id: string,
    fields: FieldLink[],
}

export interface DataModelLinks {
    document_links: DocumentLink[],
}

export interface DataFieldLinks {
    model_ids: string[],
}
