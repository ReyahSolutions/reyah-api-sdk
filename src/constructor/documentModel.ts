import {
    Anchor,
    BoundingBox,
    Column,
    DocumentModelTableField,
    Extent,
    GatherBox,
    Padding,
    DocumentModelField,
    DocumentModel,
    PaginatedDocumentModels,
    PreviewURL,
    PreviewURLs,
    DocumentModelElementField,
    Interval,
} from '..';
import newPaginationStatus from './pagination';

export function newExtent(obj: any): Extent {
    return {
        fst: (typeof obj.fst === 'number') ? parseFloat(obj.fst) : undefined,
        snd: (typeof obj.snd === 'number') ? parseFloat(obj.snd) : undefined,
        trd: (typeof obj.trd === 'number') ? parseFloat(obj.trd) : undefined,
    };
}

export function newPadding(obj: any): Padding {
    return {
        top: parseFloat(obj.top),
        right: parseFloat(obj.right),
        bottom: parseFloat(obj.bottom),
        left: parseFloat(obj.left),
    };
}

export function newInterval(obj: any): Interval {
    return {
        lo: parseFloat(obj.lo),
        hi: parseFloat(obj.hi),
    };
}

export function newBoundingBox(obj: any): BoundingBox {
    return {
        x: newInterval(obj.x),
        y: newInterval(obj.y),
    };
}

export function newColumn(obj: any): Column {
    return {
        label: obj.label,
        width: parseFloat(obj.width),
    };
}

export function newAnchor(obj: any): Anchor {
    return {
        orientation: obj.orientation,
        box: newBoundingBox(obj.box),
        label: obj.label,
        padding: obj.padding && newPadding(obj.padding),
    };
}

export function newGatherBox(obj: any): GatherBox {
    return {
        direction: obj.direction,
        extent: newExtent(obj.extent),
    };
}

/**
 * Document model service type definitions.
 */

export function newDocumentModelElementField(/* obj: any */): DocumentModelElementField {
    return {
    };
}

export function newDocumentModelTableField(obj: any): DocumentModelTableField {
    return {
        columns: obj.columns?.map(newColumn) ?? [],
    };
}

/**
 * Represents a single field of a document model.
 */
export function newDocumentModelField(obj: any): DocumentModelField {
    return {
        id: obj.id,
        name: obj.name,
        datamodel_field_id: obj.datamodel_field_id,
        description: obj.description,
        anchor: newAnchor(obj.anchor),
        gather_box: newGatherBox(obj.gather_box),
        element: obj.element && newDocumentModelElementField(/* obj.element */),
        table: obj.table && newDocumentModelTableField(obj.table),
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
        version: obj.version,
        user_id: obj.user_id,
        name: obj.name,
        datamodel_id: obj.datamodel_id,
        description: obj.description,
        fields: newDocumentModelFields(obj.fields),
        stoppers: obj.stoppers?.map(newAnchor) ?? [],
        preview_status: obj.preview_status,
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
        expiry: new Date(obj.expiry),
    };
}
export function newPreviewUrls(obj: any): PreviewURLs {
    if (!Array.isArray(obj.preview_urls)) {
        return {
            preview_urls: [],
        };
    }
    return {
        preview_urls: obj.preview_urls.map((elem: any) => newPreviewUrl(elem)),
    };
}
