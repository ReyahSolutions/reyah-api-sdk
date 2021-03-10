/**
 * Data Model service types
 */

import { PaginationStatus } from './pagination';

export enum FieldKind {
    Element = 'ELEMENT',
    Table = 'TABLE',
}

/**
 * Data model field
 */
export interface Field {
    field_id: string;
    user_id: string;
    kind: FieldKind;
    name: string;
    description: string;
    datatypes: string[];
    created_at: Date;
    updated_at: Date;
    columns: string[],
}

export interface PaginatedFields {
    fields: Field[],
    pagination_status: PaginationStatus,
}

export interface CreateFieldRequest {
    kind: FieldKind;
    name: string;
    description?: string;
    datatypes: string[];
    columns: string[],
}

export interface UpdateFieldRequest {
    field_id: string;
    kind: FieldKind;
    name: string;
    description?: string;
    datatypes: string[];
    columns: string[],
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
    pagination_status: PaginationStatus,
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
    field_ids: string[],
}
