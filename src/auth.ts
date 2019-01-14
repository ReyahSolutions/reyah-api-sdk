import constants from "./contants";
import * as path from "path";
import axios from "axios";
import { WrongCredentials } from "./errors/auth";

function query(route: string, method: ("GET" | "POST"), data?: Object) : Promise<any> {
    return axios({
        url: path.join(constants.route.soteria, constants.version.soteria, route),
        method,
        data,
        responseType: 'json'
    });
}

export interface Token {
    access_token: string
    refresh_token: string
}

/**
 * Handle authentication mecanism
 */
export default class Auth {
    /**
     * Login user with his credentials
     * @param {string} mail - Users mail
     * @param {string} password - Users password
     * @returns {Promise<Token>} Fetch promise
     * @throws {WrongCredentials} Wrong credentials provided
     * @throws {Error} Unknown error occured
     */
    public async login(mail: string, password: string): Promise<Token> {
        let resp;
        try {
            resp = await query("/login", "POST", {email: mail, password: password, scope: ["READ", "WRITE"]});
        } catch (e) {
            if (e.response.status === 401)
                throw new WrongCredentials("Invalid username or password");
            throw new Error("Unkown error occured");
        }
        const {access_token, refresh_token} = resp.data;
        return {access_token, refresh_token};
    }
}