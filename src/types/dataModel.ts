/**
 * Data Model service types
 */

/**
 * Data model field property
 */
export interface Property {
    key: string;
    value?: string;
    mandatory?: boolean;
}

/**
 * Data model field
 */
export interface Field {
    kind: string;
    type: string;
    name: string;
    description: string;
    properties: Property[];
}

/**
 * Data model
 */
export interface DataModel {
    uuid?: string;
    name?: string;
    fields?: Field[];
}
