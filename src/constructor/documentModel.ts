import { DocumentModelField, DocumentModel, PreviewURL } from '..';
import { PaginatedDocumentModels } from '../types/documentModel';

/**
 * Document model service type definitions.
 */

/**
 * Represents a single field of a document model.
 */
export function newDocumentModelField(obj: any): DocumentModelField {
    return {
        id: parseInt(obj.id, 10),
        name: obj.name,
        datamodel_field_id: parseInt(obj.datamodel_field_id, 10),
        description: obj.description,
        height: parseFloat(obj.height),
        width: parseFloat(obj.width),
        x: parseFloat(obj.x),
        y: parseFloat(obj.y),
        created_at: new Date(obj.created_at),
        updated_at: new Date(obj.updated_at),
    };
}

export function newDocumentModelFields(obj: any[]): DocumentModelField[] {
    if (!Array.isArray(obj)) {
        return [];
    }
    return obj.map((elem: any) => newDocumentModelField(elem));
}

/**
 * Represents a document model.
 */
export function newDocumentModel(obj: any): DocumentModel {
    return {
        id: parseInt(obj.id, 10),
        user_id: obj.user_id,
        attached_preview: obj.attached_preview,
        datamodel_id: parseInt(obj.datamodel_id, 10),
        description: obj.description,
        fields: newDocumentModelFields(obj.fields),
        name: obj.name,
        created_at: new Date(obj.created_at),
        updated_at: new Date(obj.updated_at),
    };
}

export function newDocumentModels(obj: any): PaginatedDocumentModels {
    if (!Array.isArray(obj.models) || typeof obj.pagination_status !== 'object') {
        return {
            models: [],
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
        models: obj.models.map((elem: any) => newDocumentModel(elem)),
        pagination_status: {
            page_size: parseInt(obj.pagination_status.page_size, 10),
            total_pages: parseInt(obj.pagination_status.total_pages, 10),
            total_entries: parseInt(obj.pagination_status.total_entries, 10),
            current_size: parseInt(obj.pagination_status.current_size, 10),
            current_page: parseInt(obj.pagination_status.current_page, 10),
        },
    };
}

/**
 * Represents the URL of a preview image.
 */
export function newPreviewUrl(obj: any): PreviewURL {
    return {
        url: obj.url,
    };
}
