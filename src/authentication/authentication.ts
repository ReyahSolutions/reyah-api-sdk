import { AuthProvider } from '../types/authentication';
import { NoAuthProvidedException } from '..';

export default class AuthManager {
    private static instance: AuthManager;

    private provider?: AuthProvider;

    public useAuthProvider(provider: AuthProvider) {
        this.provider = provider;
    }

    public static getInstance(): AuthManager {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }

    public getAuthProvider(): AuthProvider {
        if (!this.provider) {
            throw new NoAuthProvidedException();
        }
        return this.provider;
    }
}
