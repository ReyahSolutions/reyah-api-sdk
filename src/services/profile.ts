import { Service } from '..';
import { reyahServiceRequest } from '../core/core';
import { dispatchError } from '../core/errors';
import * as Status from '../types/status';
import * as Profile from '../types/profile';
import newServiceStatus from '../constructor/status';
import { newInvitation, newInvitations, newProfile } from '../constructor/profile';

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
            return newServiceStatus(resp.data);
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
            return newProfile(resp.data);
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
            return newProfile(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Create a user invitation
     * @return A promise of the user invitation creation transaction
     */
    public async createInvitation(): Promise<Profile.Invitation> {
        const subpath: string = `${this.public_subpath}/register/invitation`;
        try {
            const resp = await reyahServiceRequest.post(subpath, undefined, true);
            return newInvitation(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * List all user invitations
     * @return A promise of the user invitations list transaction
     */
    public async listInvitations(): Promise<Profile.Invitation[]> {
        const subpath: string = `${this.public_subpath}/register/invitation`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newInvitations(resp.data.invitations);
        } catch (err) {
            throw dispatchError(err);
        }
    }
}

export const profile = new ProfileService();
export default profile;
