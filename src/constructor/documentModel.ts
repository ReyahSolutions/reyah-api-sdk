import {
    DocumentModelField, DocumentModel, PaginatedDocumentModels, PreviewURL,
} from '..';
import newPaginationStatus from './pagination';

/**
 * Document model service type definitions.
 */

/**
 * Represents a single field of a document model.
 */
export function newDocumentModelField(obj: any): DocumentModelField {
    return {
        id: obj.id,
        name: obj.name,
        datamodel_field_id: obj.datamodel_field_id,
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
        id: obj.id,
        user_id: obj.user_id,
        attached_preview: obj.attached_preview,
        datamodel_id: obj.datamodel_id,
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
            pagination_status: newPaginationStatus(),
        };
    }
    return {
        models: obj.models.map((elem: any) => newDocumentModel(elem)),
        pagination_status: (obj.pagination_status === null) ? undefined : newPaginationStatus(obj.pagination_status),
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
