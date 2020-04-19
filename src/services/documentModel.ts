import { dispatchError, ReyahRequestResponse, Service } from '..';
import * as DocumentModel from '../types/documentModel';
import { reyahServiceRequest } from '../core/core';

/**
 * Document model service controller
 */
export class DocumentModelService implements Service {
    readonly subpath = '/document';

    /**
     * Remote service status
     * @return whether the service is alive or not
     */
    public async alive(): Promise<boolean> {
        const subpath: string = `${this.subpath}/health`;
        try {
            await reyahServiceRequest.get(subpath, false);
            return true;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves a document model of an user
     * @param uuid Document model uuid
     * @return A promise of the result of the document model retrieving transaction
     */
    public async retrieve(uuid: string): Promise<DocumentModel.DocumentModel> {
        const subpath: string = `${this.subpath}/models/${uuid}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return resp.data as DocumentModel.DocumentModel;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves all document models of an user
     * @return A promise of the result of the document model retrieving transaction
     */
    public async retrieveAll(): Promise<DocumentModel.DocumentModel[]> {
        const subpath: string = `${this.subpath}/models`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return resp.data as DocumentModel.DocumentModel[];
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Creates a new document model associated with an user
     * @param model The model to create
     * @return A promise of the result of the document model creation transaction
     */
    public async create(model: DocumentModel.DocumentModel): Promise<DocumentModel.DocumentModel> {
        const subpath: string = `${this.subpath}/models`;
        try {
            const resp = await reyahServiceRequest.post(subpath, model, true);
            return resp.data as DocumentModel.DocumentModel;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Patches an existing model
     * @param model The modified model to patch
     * @return A promise of the result of the document model patching transaction
     */
    public async patch(model: DocumentModel.DocumentModel): Promise<DocumentModel.DocumentModel> {
        const subpath: string = `${this.subpath}/models/${model.id}`;
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.patch(subpath, model, true);
            return resp.data as DocumentModel.DocumentModel;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Deletes an existing model
     * @param uuid The document model uuid to delete
     * @return A promise of the result of the document model deletion transaction
     */
    public async delete(uuid: string): Promise<boolean> {
        const subpath: string = `${this.subpath}/models/${uuid}`;
        try {
            await reyahServiceRequest.delete(subpath, true);
            return true;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves the preview file associated to a document model
     * @param uuid The document model uuid
     * @return A promise of the result of the preview file retrieving transaction
     */
    public async previewUrl(uuid: string): Promise<DocumentModel.PreviewURL> {
        const subpath: string = `${this.subpath}/models/${uuid}/preview`;
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.get(subpath, true);
            return resp.data as DocumentModel.PreviewURL;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Sets the preview file associated to a document model
     * @param request Information of the preview file of the document model
     * @return A promise of the result of the preview file setting transaction
     */
    public async setPreview(request: DocumentModel.UuidWithContentTypeRequest): Promise<DocumentModel.PreviewURL> {
        const subpath: string = `${this.subpath}/models/${request.uuid}/preview`;
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.patch(subpath, request, true);
            return resp.data as DocumentModel.PreviewURL;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Deletes the preview file associated to a document model
     * @param uuid The document model uuid
     * @return A promise of the result of the preview file deletion transaction
     */
    public async deletePreview(uuid: string): Promise<boolean> {
        const subpath: string = `${this.subpath}/models/${uuid}/preview`;
        try {
            await reyahServiceRequest.delete(subpath, true);
            return true;
        } catch (err) {
            throw dispatchError(err);
        }
    }
}

export const documentModel = new DocumentModelService();
export default documentModel;
