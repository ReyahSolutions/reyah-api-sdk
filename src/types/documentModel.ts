/**
 * Document model service type definitions.
 */

/**
 * Represents a single field of a document model.
 */
export interface DocumentModelField {
    id?: number;
    name: string;
    description?: string;
    x: number;
    y: number;
    width: number;
    height: number;
    created_at?: Date;
    updated_at?: Date;
}

/**
 * Represents a document model.
 */
export interface DocumentModel {
    id?: string;
    user_id?: string;
    datamodel_id: string;
    name: string;
    description?: string;
    fields: DocumentModelField[];
    attached_preview?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

/**
 * Represents the request payload for asking to upload a preview file.
 */
export interface UuidWithContentTypeRequest {
    uuid: string;
    contentType: string;
}

/**
 * Represents the URL of a preview image.
 */
export interface PreviewURL {
    url: string;
}
