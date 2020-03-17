import { IConfig } from '../types/reyah';

export class Config {
    static config: IConfig;

    static getConfig(): IConfig {
        return Config.config || {
            api_protocol: 'https',
            api_hostname: 'api.reyah.eu',
            auth_protocol: 'https',
            auth_hostname: 'auth.reyah.eu',
        };
    }

    static useConfig(config: IConfig) {
        Config.config = config;
    }
}

export default Config;
