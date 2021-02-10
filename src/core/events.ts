import EventEmitter from 'src/core/events';
import { axiosEmitter } from './implementation/axios';

export class Events extends EventEmitter {
    constructor() {
        super();
        axiosEmitter.addListener('request', (e) => {
            this.emit('axios:request', e);
        });
        axiosEmitter.addListener('error', (e) => {
            this.emit('error', e);
        });
    }
}

export const events = new Events();
export default events;
