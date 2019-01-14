/**
 * Error triggered on wrong credentials
 */
export class WrongCredentials extends Error {
    /**
     * Contructor of the class
     * @param {Array<any>} args 
     */
    public constructor(...args: Array<any>) {
        super(...args);
        Error.captureStackTrace(this, WrongCredentials);
    }

    /**
     * Type of the class (mandatory for the final type checking)
     */
    public type: Object = WrongCredentials;
}