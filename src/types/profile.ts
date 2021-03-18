/**
 * Profile service types
 */

/**
 * Profile
 */
export interface Profile {
    user_id: string;
    first_name: string;
    last_name: string;
    is_registered: boolean;
    email: string;
    email_confirmed: boolean;
    created_at: Date;
    updated_at: Date;
    company_name: string;
    address1: string;
    address2: string;
    post_code: string;
    city: string;
    country: string;
    phone: string;
    tawk_to_hash: string;
}

/**
 * Register request interface
 */
export interface Register {
    company_name?: string;
    address1?: string;
    address2?: string;
    post_code?: string;
    city?: string;
    country?: string;
    phone?: string;
}

/**
 * Invitation
 */
export interface Invitation {
    user_id: string;
    code: string;
    created_at: Date;
    consumed: boolean;
    consumed_by: string;
}
