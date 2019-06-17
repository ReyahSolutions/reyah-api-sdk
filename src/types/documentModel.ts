/**
 * Data Document service types
 */

/**
 * Data model data field
 */
export interface DataFields {
    name: string;
    description: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Document model
 */
export interface DocumentModel {
    uuid?: string;
    user_uuid: string;
    name: string;
    description: string;
    data_fields: DataFields[];
    preview_file?: string;
    attached_preview?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

/**
 * Request to define the preview file
 */
export interface UuidWithContentType {
    uuid: string;
    contentType: string;
}

/**
 * File recovery response format
 */
export interface PreviewURL {
    url: string;
}
