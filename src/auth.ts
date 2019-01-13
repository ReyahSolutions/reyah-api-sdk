import constants from "./contants";
import * as path from "path";
import { promises } from "fs";

function query(route: string, method: ("GET" | "POST"), data?: Object) {
    return fetch(path.join(constants.route.soteria, constants.version.soteria, route), {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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
     */
    async login(mail: string, password: string): Promise<Token> {
        const resp = await query("/login", "POST", {email: mail, password: password, scope: ["READ", "WRITE"]})
        const {access_token, refresh_token} = await resp.json();
        return {access_token, refresh_token};
        // return query("/login", "POST", {email: mail, password: password, scope: ["READ", "WRITE"]});
    }
}