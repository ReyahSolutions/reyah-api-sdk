import EventEmitter from 'events';
import { axiosEmitter } from './implementation/axios';
import { coreEmitter } from './core';

/**
 * Events is an event emitter exposed to the user
 */
export class Events extends EventEmitter {
    constructor() {
        super();
        coreEmitter.addListener('request', (e) => {
            this.emit('request', e);
        });
        coreEmitter.addListener('error', (e) => {
            this.emit('error', e);
        });
        axiosEmitter.addListener('request', (e) => {
            this.emit('axios:request', e);
        });
        axiosEmitter.addListener('error', (e) => {
            this.emit('axios:error', e);
        });
    }
}

export const events = new Events();
export default events;
