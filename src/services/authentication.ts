import { Service } from "../types/reyah";
import {
    ForbiddenException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
    UnknownException
} from "../types/errors";
import * as Authentication from "../types/authentication";
import { Auth as Cognito } from "aws-amplify";
import { ISignUpResult } from "amazon-cognito-identity-js";

/**
 * User management service via Cognito
 */

export class AuthenticationService implements Service {

    /**
     * Remote service status
     * @return whether the service is alive or not
     */
    public async alive(): Promise<boolean> {
        return true;
    }

    /**
     * Logging in a user on Cognito
     * @param mail User's email address associated to his account
     * @param password User's password associated to his account
     * @return A promise of the result of the login transaction
     */
    public async login(mail: string, password: string): Promise<Authentication.Tokens> {
        try {
            const resp = await Cognito.signIn(mail, password);
            const tokens = resp.signInUserSession;
            const { accessToken, refreshToken } = tokens;
            return {
                access_token: accessToken.jwtToken,
                refresh_token: refreshToken.token,
                expiration_date: accessToken.expiration
            } as Authentication.Tokens;
        } catch (err) {
            if (err.code === "UserNotFoundException")
                throw new NotFoundException();
            throw new UnknownException();
        }
    }

    /**
     * Registering a new user on Cognito
     * @param mail User's email address to attach to the new account
     * @param password User's password to attach to the new account
     * @return A promise of the result of the account creation transaction
     */
    public async register(mail: string, password: string): Promise<ISignUpResult> {
        try {
            return Cognito.signUp({
                username: mail,
                password: password,
            })
        } catch (err) {
            if (err.response.status === 401)
                throw new UnauthorizedException();
            throw new UnknownException();
        }
    }

    /**
     * Forgotten password for a user account
     * @param mail User's mail address associated to the unreachable account
     * @return A promise of the result of the forgotten password transaction
     */
    public async forgot(mail: string): Promise<boolean> {
        try {
            await Cognito.forgotPassword(mail);
        } catch (err) {
            if (err.code === "UserNotFoundException") {
                throw new NotFoundException("This account does not exist");
            }
            if (err.code === "LimitExceededException") {
                throw new TooManyRequestsException();
            }
            throw new UnknownException();
        }
        return true;
    }

    /**
     * Second step of the forgotten password transaction
     * Collects confirmation code and new password then submit them to Cognito
     * @param mail User's mail address associated to the unreachable account
     * @param code Security code provided to the user by Cognito according to user's policy
     * @param password User's unreachable account new password
     * @return An empty promise
     */
    public async resetForgotPassword(mail: string, code: string, password: string): Promise<void> {
        try {
            await Cognito.forgotPasswordSubmit(mail, code, password)
        } catch (err) {
            if (err.code === "ExpiredCodeException") {
                throw new ForbiddenException();
            }
            throw new UnknownException();
        }
    }
}

export const authentication = new AuthenticationService();
export default authentication;
