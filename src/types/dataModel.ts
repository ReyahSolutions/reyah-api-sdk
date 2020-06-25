/**
 * Data Model service types
 */

import { PaginationStatus } from "./pagination";

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
    field_id: number;
    user_id: string;
    kind: string;
    name: string;
    description: string;
    properties: Property[];
    datatypes: number[];
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
    datatypes: number[];
}

export interface UpdateFieldRequest {
    field_id: number;
    kind: string;
    name: string;
    description?: string;
    properties?: PropertyRequest[];
    datatypes: number[];
}

/**
 * Data model
 */
export interface DataModel {
    model_id: number;
    user_id: string;
    name: string;
    description: string;
    fields: Field[];
    created_at: Date;
    updated_at: Date;
}

export interface PaginatedDataModels {
    models: DataModel[],
    pagination_status: PaginationStatus,
}

export interface CreateDataModelRequest {
    name: string;
    description?: string;
    fields: number[];
}

export interface UpdateDataModelRequest {
    model_id: number;
    name: string;
    description?: string;
    fields: number[];
}

export interface FieldLink {
    datamodel_field_id: number,
    document_field_id: number[],
}

export interface DocumentLink {
    document_id: number,
    fields: FieldLink[],
}

export interface DataModelLinks {
    document_links: DocumentLink[],
}

export interface DataFieldLinks {
    model_ids: number[],
}
