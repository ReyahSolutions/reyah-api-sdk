/**
 * Quota service types constructor
 */

import {
    QuotaResource,
    QuotaResources,
    QuotaValue,
    RangeSelector,
} from '../types/quota';

/**
 * Creates a new QuotaValue from any object
 */
export function newQuotaValue(obj: any): QuotaValue {
    return {
        current: parseInt(obj.current, 10) || 0,
        max: parseInt(obj.max, 10) || 0,
    };
}

/**
 * Creates a new QuotaValue map from any object
 */
export function newQuotaValueMap(obj: any): { [key in RangeSelector]?: QuotaValue } {
    const mapToReturn: { [key in RangeSelector]?: QuotaValue } = {};
    Object.entries(obj).map(([k, v]: [string, any]) => {
        mapToReturn[k as RangeSelector] = newQuotaValue(v);
        return null;
    });
    return mapToReturn;
}

/**
 * Creates a new QuotaResource from any object
 */
export function newQuotaResource(obj: any): QuotaResource {
    return {
        resource_name: obj.resource_name || '',
        quotas: newQuotaValueMap(obj.quotas) || {},
    };
}

/**
 * Creates a new QuotaResources from any object
 */
export function newQuotaResources(obj: any): QuotaResources {
    return {
        quotas: obj.quotas?.map((elem: any) => newQuotaResource(elem)) || [],
    };
}
