/**
 * Document model service type definitions.
 */

import { PaginationStatus } from './pagination';

export enum PreviewStatus {
    UNSET = 'UNSET',
    PENDING = 'PENDING',
    SET = 'SET',
    ERRORED = 'ERRORED',
}

export enum AnchorOrientation {
    Vertical = 'VERTICAL',
    Horizontal = 'HORIZONTAL',
}

export enum GatherBoxDirection {
    Up = 'UP',
    Right = 'RIGHT',
    Down = 'DOWN',
    Left = 'LEFT',
}

/**
 * Represents a single field of a document model.
 */
export interface DocumentModelField {
    id: string;
    name: string;
    datamodel_field_id: string;
    description: string;
    anchor: Anchor;
    gatherBox: GatherBox;
    element?: DocumentModelElementField;
    table?: DocumentModelTableField;
}

export interface DocumentModelElementField {
}

export interface DocumentModelTableField {
    columns: Column[];
}

export interface Column {
    label?: string;
    width: number;
}

export interface Anchor {
    box: BoundingBox;
    orientation: AnchorOrientation;
    label?: string;
    padding?: Padding;
}

export interface GatherBox {
    direction: GatherBoxDirection;
    extent: Extent;
}

export interface Interval {
    lo: number;
    hi: number;
}

export interface BoundingBox {
    x: Interval;
    y: Interval;
}

export interface Padding {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface Extent {
    fst?: number;
    snd?: number;
    trd?: number;
}

export interface CreateDocumentModelFieldRequest {
    name: string;
    datamodel_field_id: string;
    description?: string;
    anchor: Anchor;
    gatherBox: GatherBox;
    element?: DocumentModelElementField;
    table?: DocumentModelTableField;
}

export interface UpdateDocumentModelFieldRequest {
    id: string;
    name: string;
    datamodel_field_id: string;
    description?: string;
    anchor: Anchor;
    gatherBox: GatherBox;
    element?: DocumentModelElementField;
    table?: DocumentModelTableField;
}

/**
 * Represents a document model.
 */
export interface DocumentModel {
    id: string;
    version: number,
    user_id: string;
    datamodel_id: string;
    name: string;
    description: string;
    fields: DocumentModelField[];
    stoppers: Anchor[];
    preview_status: PreviewStatus;
    created_at: Date;
    updated_at: Date;
}

export interface PaginatedDocumentModels {
    models: DocumentModel[];
    pagination_status?: PaginationStatus;
}

export interface CreateDocumentModelRequest {
    datamodel_id: string;
    name: string;
    description?: string;
    fields: DocumentModelField[];
    stoppers: Anchor[];
}

export interface UpdateDocumentModelFieldWithModelRequest {
    id?: string;
    name: string;
    datamodel_field_id: string;
    description?: string;
    anchor: Anchor;
    gatherBox: GatherBox;
    element?: DocumentModelElementField;
    table?: DocumentModelTableField;
}

export interface UpdateDocumentModelRequest {
    id: string;
    name: string;
    description?: string;
    fields: UpdateDocumentModelFieldWithModelRequest[];
    stoppers: Anchor[];
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
    expiry: Date;
}
export interface PreviewURLs {
    preview_urls: PreviewURL[];
}
