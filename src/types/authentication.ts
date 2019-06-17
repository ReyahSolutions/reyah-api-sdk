/**
 * Authentication service types
 */

/**
 * Token format in case of successful authentication
 */
export interface Tokens {
    access_token: string,
    refresh_token: string,
    expiration_date: number
}
