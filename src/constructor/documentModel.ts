import { DocumentModelField, DocumentModel, PreviewURL } from '..';

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

export function newDocumentModels(obj: any[]): DocumentModel[] {
    if (!Array.isArray(obj)) {
        return [];
    }
    return obj.map((elem: any) => newDocumentModel(elem));
}

/**
 * Represents the URL of a preview image.
 */
export function newPreviewUrl(obj: any): PreviewURL {
    return {
        url: obj.url,
    };
}
