import AxiosServiceRequest, { ReyahErrorAxios } from "./implementation/axios";
import { ReyahServiceRequest } from "../types/core";

/**
 * Exports the implementation of core types
 */

export const reyahServiceRequest = AxiosServiceRequest as ReyahServiceRequest;
export const reyahError = ReyahErrorAxios;
export default {
    reyahServiceRequest,
    reyahError
};
