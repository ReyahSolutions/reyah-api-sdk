import { Service } from "../types/reyah";
import * as DocumentModel from "../types/documentModel";
import { reyahServiceRequest, reyahError } from "../core/core";
import { ReyahRequestConfiguration, ReyahRequestResponse } from "../types/core";
import config from "../../reyah";

/**
 * Document model management service
 */

const DOCUMENT_MODEL_PROTOCOL = config.documentModel.DOCUMENT_MODEL_PROTOCOL;
const DOCUMENT_MODEL_HOSTNAME = config.documentModel.DOCUMENT_MODEL_HOSTNAME;
const DOCUMENT_MODEL_PORT = config.documentModel.DOCUMENT_MODEL_PORT;
const DOCUMENT_MODEL_VERSION = config.documentModel.DOCUMENT_MODEL_VERSION;

/**
 * Meta request configuration
 */
class MetaRequestConfiguration implements ReyahRequestConfiguration {
    readonly protocol: string = DOCUMENT_MODEL_PROTOCOL;
    readonly hostname: string = DOCUMENT_MODEL_HOSTNAME;
    readonly port: string = DOCUMENT_MODEL_PORT;

    /**
     * Request configuration base path
     * @return A path
     */
    get basePath(): string {
        return `${this.protocol}://${this.hostname}:${this.port}`;
    }
}

/**
 * Document model service request configuration
 */
class ServiceRequestConfiguration extends MetaRequestConfiguration {
    readonly version: string = DOCUMENT_MODEL_VERSION;

    /**
     * Request configuration base path
     * @return A path
     */
    get basePath(): string {
        return `${super.basePath}/${this.version}`;
    }
}

/**
 * Document model service controller
 */
export class DocumentModelService implements Service {
    private serviceRequestConfiguration: ReyahRequestConfiguration = new ServiceRequestConfiguration();
    private metaRequestConfiguration: ReyahRequestConfiguration = new MetaRequestConfiguration();

    /**
     * Remote service status
     * @return whether the service is alive or not
     */
    public async alive(): Promise<boolean> {
        const subpath: string = "/healthz";
        try {
            await reyahServiceRequest.get(this.metaRequestConfiguration, subpath);
            return true;
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Retrieves a document model of an user
     * @param uuid Document model uuid
     * @return A promise of the result of the document model retrieving transaction
     */
    public async retrieve(uuid: string): Promise<DocumentModel.DocumentModel> {
        const subpath: string = `/models/${uuid}`;
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.get(this.serviceRequestConfiguration, subpath);
            return resp.data as DocumentModel.DocumentModel;
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Retrieves all document models of an user
     * @return A promise of the result of the document model retrieving transaction
     */
    public async retrieveAll(): Promise<DocumentModel.DocumentModel[]> {
        const subpath: string = "/models";
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.get(this.serviceRequestConfiguration, subpath);
            return resp.data as DocumentModel.DocumentModel[];
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Creates a new document model associated with an user
     * @param model The model to create
     * @return A promise of the result of the document model creation transaction
     */
    public async create(model: DocumentModel.DocumentModel): Promise<DocumentModel.DocumentModel> {
        const subpath: string = "/models";
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.post(this.serviceRequestConfiguration, subpath, model);
            return resp.data as DocumentModel.DocumentModel;
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Patches an existing model
     * @param model The modified model to patch
     * @return A promise of the result of the document model patching transaction
     */
    public async patch(model: DocumentModel.DocumentModel): Promise<DocumentModel.DocumentModel> {
        const subpath: string = `/models/${model.uuid}`;
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.patch(this.serviceRequestConfiguration, subpath, model);
            return resp.data as DocumentModel.DocumentModel;
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Deletes an existing model
     * @param uuid The document model uuid to delete
     * @return A promise of the result of the document model deletion transaction
     */
    public async delete(uuid: string): Promise<boolean> {
        const subpath: string = `/models/${uuid}`;
        try {
            await reyahServiceRequest.delete(this.serviceRequestConfiguration, subpath);
            return true;
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Retrieves the preview file associated to a document model
     * @param uuid The document model uuid
     * @return A promise of the result of the preview file retrieving transaction
     */
    public async previewUrl(uuid: string): Promise<DocumentModel.PreviewURL> {
        const subpath: string = `/models/${uuid}/preview`;
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.get(this.serviceRequestConfiguration, subpath);
            return resp.data as DocumentModel.PreviewURL;
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Sets the preview file associated to a document model
     * @param request Information of the preview file of the document model
     * @return A promise of the result of the preview file setting transaction
     */
    public async setPreview(request: DocumentModel.UuidWithContentType): Promise<DocumentModel.PreviewURL> {
        const subpath: string = `/models/${request.uuid}/preview`;
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.patch(this.serviceRequestConfiguration, subpath, request);
            return resp.data as DocumentModel.PreviewURL;
        } catch (err) {
            throw new reyahError(err);
        }
    }

    /**
     * Deletes the preview file associated to a document model
     * @param uuid The document model uuid
     * @return A promise of the result of the preview file deletion transaction
     */
    public async deletePreview(uuid: string): Promise<boolean> {
        const subpath: string = `/models/${uuid}/preview`;
        try {
            await reyahServiceRequest.delete(this.serviceRequestConfiguration, subpath);
            return true;
        } catch (err) {
            throw new reyahError(err);
        }
    }
}

export const documentModel = new DocumentModelService();
export default documentModel;
