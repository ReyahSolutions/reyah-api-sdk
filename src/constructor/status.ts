/**
 * Status of services types
 */

import { ServiceStatus } from '..';

/**
 * Status of a service
 */
export default function newServiceStatus(obj: any): ServiceStatus {
    return {
        ok: obj.ok,
        reason: obj.reason,
    };
}
