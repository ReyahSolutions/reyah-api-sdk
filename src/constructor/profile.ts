import { Invitation, Profile } from '..';

/**
 * Profile
 */
export function newProfile(obj: any): Profile {
    return {
        user_id: obj.user_id,
        first_name: obj.first_name,
        last_name: obj.last_name,
        address1: obj.address1,
        address2: obj.address2,
        city: obj.city,
        country: obj.country,
        email: obj.email,
        email_confirmed: obj.email_confirmed,
        is_registered: obj.is_registered,
        phone: obj.phone,
        post_code: obj.post_code,
        created_at: new Date(obj.created_at),
        updated_at: new Date(obj.updated_at),
    };
}

/**
 * Invitation
 */
export function newInvitation(obj: any): Invitation {
    return {
        user_id: obj.user_id,
        code: obj.code,
        consumed: obj.consumed,
        consumed_by: obj.consumed_by,
        created_at: new Date(obj.created_at),
    };
}

/**
 * Invitations
 */
export function newInvitations(obj: any[]): Invitation[] {
    if (!Array.isArray(obj)) {
        return [];
    }
    return obj.map((elem: any) => newInvitation(elem));
}
