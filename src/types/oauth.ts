/**
 * OAuth service types
 */

export enum GrantTypes {
    Implicit = 'implicit',
    AuthorizationCode = 'authorization_code',
    RefreshToken = 'refresh_token',
    ClientCredentials = 'client_credentials'
}

/**
 * OAuth client
 */
export interface OAuthClientWithSecret {
    client_id: number;
    client_secret: string;
    name: string;
    description: string;
    banned: boolean;
    redirect_uris: string[];
    scopes: string[];
    grant_types: string[];
    response_types: string[];
    logo_uri: string;
    created_at: Date;
    updated_at: Date;
}

export interface OAuthClient {
    client_id: number;
    name: string;
    description: string;
    banned: boolean;
    redirect_uris: string[];
    scopes: string[];
    grant_types: string[];
    response_types: string[];
    logo_uri: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateOAuthClient {
    name: string;
    description?: string;
    redirect_uris?: string[];
    grant_types: string[];
    scopes?: string[]
    logo_uri?: string;
}

export interface PatchOAuthClientRequest {
    client_id: number;
    name: string;
    description?: string;
    redirect_uris?: string[];
    grant_types: string[];
    scopes?: string[];
    logo_uri?: string;
}

export interface Scope {
    scope: string;
    description: string;
}
