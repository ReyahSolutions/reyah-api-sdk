import { ReyahRequestConfiguration } from "./core";

/**
 * Reyah SDK related types
 */

/**
 * Standard Reyah error
 */
export class ReyahError extends Error {
    name: string;
    message: string;
    stack?: string;
    code?: number;
    error?: string;
    request?: ReyahRequestConfiguration;

    /**
     * Standard printing function
     */
    public print(): void {
        console.log(`Name: ${this.name}\nMessage: ${this.message}\nStack: ${this.stack}\nCode: ${this.code}\nError: ${this.error}`);
        console.log(this.request);
    }

    constructor(message: string, original: Error) {
        super(message);
        this.name = ReyahError.name;
        this.message = message;
        this.stack = original.stack;
        Object.setPrototypeOf(this, ReyahError.prototype);
    }
}

/**
 * Minimum requirements for reyah service implementations
 */
export interface Service {
    alive(): Promise<boolean>;
}
