import { dispatchError, Service } from '..';
import { reyahServiceRequest } from '../core/core';
import * as Status from '../types/status';
import * as Profile from '../types/profile';

/**
 * Data type service controller
 */
export class ProfileService implements Service {
    readonly public_subpath = '/profile';
    readonly private_subpath = '/me';

    /**
   * Remote service status
   * @return whether the service is alive or not
   */
    public async alive(): Promise<Status.ServiceStatus> {
        const subpath: string = `${this.public_subpath}/health`;
        try {
            const resp = await reyahServiceRequest.get(subpath, false);
            return resp.data as Status.ServiceStatus;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
    * Retrieves the profile of the current user
    * @return A promise of the user's profile
    */
    public async me(): Promise<Profile.Profile> {
        const subpath: string = `${this.private_subpath}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return resp.data as Profile.Profile;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Register the user on the Reyah API
     * @param profile The profile of the user
     * @return A promise of the user registration transaction
     */
    public async register(profile: Profile.Register): Promise<Profile.Profile> {
        const subpath: string = `${this.public_subpath}/register`;
        try {
            const resp = await reyahServiceRequest.post(subpath, profile, true);
            return resp.data as Profile.Profile;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Create a user invitation
     * @return A promise of the user invitation creation transaction
     */
    public async createInvite(): Promise<Profile.Invitation> {
        const subpath: string = `${this.public_subpath}/register/invite`;
        try {
            const resp = await reyahServiceRequest.post(subpath, undefined, true);
            return resp.data as Profile.Invitation;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * List all user invitation
     * @return A promise of the user invitation list transaction
     */
    public async listInvite(): Promise<Profile.Invitation[]> {
        const subpath: string = `${this.public_subpath}/register/invite`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return resp.data.invites as Profile.Invitation[];
        } catch (err) {
            throw dispatchError(err);
        }
    }
}

export const profile = new ProfileService();
export default profile;