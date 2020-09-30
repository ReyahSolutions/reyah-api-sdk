/**
 * Document model service type definitions.
 */

import { PaginationStatus } from './pagination';

/**
 * Represents a single field of a document model.
 */
export interface DocumentModelField {
    id: number;
    name: string;
    datamodel_field_id: string;
    description: string;
    x: number;
    y: number;
    width: number;
    height: number;
    created_at: Date;
    updated_at: Date;
}

export interface CreateDocumentModelFieldRequest {
    name: string;
    datamodel_field_id: string;
    description?: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface UpdateDocumentModelFieldRequest {
    id: number;
    name: string;
    datamodel_field_id: string;
    description?: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Represents a document model.
 */
export interface DocumentModel {
    id: number;
    user_id: string;
    datamodel_id: string;
    name: string;
    description: string;
    fields: DocumentModelField[];
    attached_preview: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface PaginatedDocumentModels {
    models: DocumentModel[],
    pagination_status?: PaginationStatus,
}

export interface CreateDocumentModelRequest {
    datamodel_id: string;
    name: string;
    description?: string;
    fields: DocumentModelField[];
}

export interface UpdateDocumentModelRequest {
    id: number;
    datamodel_id: string;
    name: string;
    description?: string;
    fields: DocumentModelField[];
}

/**
 * Represents the request payload for asking to upload a preview file.
 */
export interface IdWithContentTypeRequest {
    id: string;
    contentType: string;
}

/**
 * Represents the URL of a preview image.
 */
export interface PreviewURL {
    url: string;
}
