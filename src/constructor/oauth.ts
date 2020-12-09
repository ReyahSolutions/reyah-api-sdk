import { OAuthClient, OAuthClientWithSecret, Scope } from '../types/oauth';

/**
 * OAuth client service constructor
 */

/**
 * OAuth client
 */
export function newOAuthClient(obj: any): OAuthClient {
    return {
        client_id: obj.client_id,
        name: obj.name,
        banned: obj.banned,
        description: obj.description,
        grant_types: obj.grant_types,
        redirect_uris: obj.redirect_uris,
        response_types: obj.response_types,
        scopes: obj.scopes,
        logo_uri: obj.logo_uri,
        created_at: new Date(obj.created_at),
        updated_at: new Date(obj.updated_at),
    };
}

/**
 * OAuth clients
 */
export function newOAuthClients(obj: any): OAuthClient[] {
    if (!Array.isArray(obj)) {
        return [];
    }
    return obj.map((elem: any) => newOAuthClient(elem));
}

/**
 * OAuth client with secret
 */
export function newOAuthClientWithSecret(obj: any): OAuthClientWithSecret {
    const client = (newOAuthClient(obj) as OAuthClientWithSecret);
    client.client_secret = obj.client_secret;
    return client;
}

/**
 * OAuth scopes list
 */
export function newOAuthScope(obj: any): Scope {
    return {
        scope: obj.scope,
        description: obj.description,
    };
}

export function newOAuthScopesList(obj: any): Scope[] {
    if (!Array.isArray(obj)) {
        return [];
    }
    return obj.map((elem) => newOAuthScope(elem));
}
