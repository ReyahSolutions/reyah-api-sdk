import {
    DataFieldLinks,
    DataModel,
    DataModelLinks,
    DocumentLink,
    Field,
    FieldLink,
    PaginatedDataModels,
    PaginatedFields,
    Property,
} from '..';
import newPaginationStatus from './pagination';

/**
 * Data model field property
 */
export function newProperty(obj: any): Property {
    return {
        key: obj.key,
        value: obj.value,
    };
}

/**
 * Data model field
 */
export function newField(obj: any): Field {
    return {
        created_at: new Date(obj.created_at),
        datatypes: obj.datatypes?.map((elem: string) => parseInt(elem, 10)) || [],
        description: obj.description,
        field_id: parseInt(obj.field_id, 10),
        kind: obj.kind,
        name: obj.name,
        properties: obj.properties?.map((elem: any) => newProperty(elem)) || [],
        updated_at: new Date(obj.updated_at),
        user_id: obj.user_id,
    };
}

export function newPaginatedFields(obj: any): PaginatedFields {
    if (!Array.isArray(obj.fields) || typeof obj.pagination_status !== 'object') {
        return {
            fields: [],
            pagination_status: newPaginationStatus(),
        };
    }
    return {
        fields: obj.fields.map((elem: any) => newField(elem)),
        pagination_status: newPaginationStatus(obj.pagination_status),
    };
}

/**
 * Data model
 */
export function newDataModel(obj: any): DataModel {
    return {
        created_at: new Date(obj.created_at),
        description: obj.description,
        fields: obj.fields?.map((elem: any) => newField(elem)) || [],
        model_id: parseInt(obj.model_id, 10),
        name: obj.name,
        updated_at: new Date(obj.updated_at),
        user_id: obj.user_id,
    };
}

export function newPaginatedDataModels(obj: any): PaginatedDataModels {
    if (!Array.isArray(obj.models) || typeof obj.pagination_status !== 'object') {
        return {
            models: [],
            pagination_status: newPaginationStatus(),
        };
    }
    return {
        models: obj.models.map((elem: any) => newDataModel(elem)),
        pagination_status: (obj.pagination_status === null) ? undefined : newPaginationStatus(obj.pagination_status),
    };
}

export function newFieldLink(obj: any): FieldLink {
    return {
        datamodel_field_id: parseInt(obj.datamodel_field_id, 10),
        document_field_id: obj.document_field_id?.map((elem: string) => parseInt(elem, 10)) || [],
    };
}

export function newDocumentLink(obj: any): DocumentLink {
    return {
        document_id: parseInt(obj.document_id, 10),
        fields: obj.fields?.map((elem: any) => newFieldLink(elem)) || [],
    };
}

export function newDataModelLinks(obj: any): DataModelLinks {
    return {
        document_links: obj.document_links?.map((elem: any) => newDocumentLink(elem)) || [],
    };
}

export function newDataFieldLinks(obj: any): DataFieldLinks {
    return {
        model_ids: obj.model_ids?.map((elem: string) => parseInt(elem, 10)) || [],
    };
}
