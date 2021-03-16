/**
 * Quota service types
 */

export enum ResourceName {
    // Resource name
    DocumentModel = 'document_model',
    DataModel = 'data_model',
    DataField = 'data_field',
    Condition = 'condition',
    ExtractionJob = 'extraction_job',
    RenderingJob = 'rendering_job',
    PreviewJob = 'preview_job',

    // Association
    Jobs = 'jobs',
    ModelResources = 'model_resources',
}

export enum RangeSelector {
    AllTime = 'alltime',
    Yearly = 'yearly',
    Monthly = 'monthly',
    Weekly = 'weekly',
    Daily = 'daily',
    Hourly = 'hourly',
}

export interface QuotaValue {
    current: number,
    max: number,
}

export interface QuotaResource {
    resource_name: string,
    quotas: { [key in RangeSelector]?: QuotaValue },
}

export interface QuotaResources {
    quotas: QuotaResource[],
}
