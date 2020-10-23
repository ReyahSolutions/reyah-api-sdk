import { Service, PatchOAuthClientRequest } from '..';
import * as OAuth from '../types/oauth';
import * as Status from '../types/status';
import { reyahServiceRequest } from '../core/core';
import { dispatchError } from '../core/errors';
import newServiceStatus from '../constructor/status';
import {
    newOAuthClient,
    newOAuthClients,
    newOAuthClientWithSecret,
    newOAuthScopesList,
} from '../constructor/oauth';

/**
 * OAuth service controller
 */
export class OAuthService implements Service {
    readonly subpath = '/oauth';

    /**
     * Remote service status
     * @return whether the service is alive or not
     */
    public async alive(): Promise<Status.ServiceStatus> {
        const subpath: string = `${this.subpath}/health`;
        try {
            const resp = await reyahServiceRequest.get(subpath, false);
            return newServiceStatus(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Create an OAuth client
     * @param client The client to be created
     * @return A promise of the oauth client creation transaction
     */
    public async createOAuthClient(client: OAuth.CreateOAuthClient): Promise<OAuth.OAuthClientWithSecret> {
        const subpath: string = `${this.subpath}/clients`;
        try {
            const resp = await reyahServiceRequest.post(subpath, client, true);
            return newOAuthClientWithSecret(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves an OAuth client
     * @param clientId The id of the client to retrieve
     * @return A promise of the result of the oauth client retrieving transaction
     */
    public async retrieveOAuthClient(clientId: number): Promise<OAuth.OAuthClient> {
        const subpath: string = `${this.subpath}/clients/${clientId}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newOAuthClient(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves all OAuth client
     * @return A promise of the result of the oauth client retrieving transaction
     */
    public async retrieveAllOAuthClient(): Promise<OAuth.OAuthClient[]> {
        const subpath: string = `${this.subpath}/clients`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newOAuthClients(resp.data.clients);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Patch an OAuth client
     * @param client The modified OAuth client
     * @return A promise of the result of the OAuth client patching transaction
     */
    public async patchOAuthClient(client: PatchOAuthClientRequest): Promise<OAuth.OAuthClient> {
        const subpath: string = `${this.subpath}/clients/${client.client_id}`;
        try {
            const resp = await reyahServiceRequest.patch(subpath, client, true);
            return newOAuthClient(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Delete an OAuth client
     * @param clientId The id of the client to delete
     * @return A promise of the result of the OAuth client deletion transaction
     */
    public async deleteOAuthClient(clientId: number): Promise<boolean> {
        const subpath: string = `${this.subpath}/clients/${clientId}`;
        try {
            await reyahServiceRequest.delete(subpath, true);
            return true;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Regenerate the secret of an OAuth client
     * @param clientId The id of the client to regenerate
     * @return A promise of the result of the OAuth client secret regeneration transaction
     */
    public async regenSecret(clientId: number): Promise<OAuth.OAuthClientWithSecret> {
        const subpath: string = `${this.subpath}/clients/${clientId}/secret`;
        try {
            const resp = await reyahServiceRequest.post(subpath, undefined, true);
            return newOAuthClientWithSecret(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    public async listScopes(): Promise<OAuth.Scope[]> {
        const subpath: string = `${this.subpath}/scopes`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newOAuthScopesList(resp.data.scopes);
        } catch (err) {
            throw dispatchError(err);
        }
    }
}

export const oauth = new OAuthService();
export default oauth;
