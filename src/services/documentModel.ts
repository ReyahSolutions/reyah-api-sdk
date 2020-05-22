import {
    dispatchError, Filter, ReyahRequestResponse, Service,
} from '..';
import * as DocumentModel from '../types/documentModel';
import { reyahServiceRequest } from '../core/core';
import * as Status from '../types/status';
import newServiceStatus from '../constructor/status';
import { newDocumentModel, newDocumentModels, newPreviewUrl } from '../constructor/documentModel';

/**
 * Document model service controller
 */
export class DocumentModelService implements Service {
    readonly subpath = '/document';

    /**
     * Remote service status
     * @return whether the service is alive or not
     */
    public async alive(): Promise<Status.ServiceStatus> {
        const subpath: string = `${this.subpath}/health`;
        try {
            const resp = await reyahServiceRequest.get(subpath, false);
            return newServiceStatus(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves a document model of an user
     * @param id Document model id
     * @return A promise of the result of the document model retrieving transaction
     */
    public async retrieve(id: number): Promise<DocumentModel.DocumentModel> {
        const subpath: string = `${this.subpath}/models/${id}`;
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newDocumentModel(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves all document models of an user
     * @return A promise of the result of the document model retrieving transaction
     */
    public async retrieveAll(filter?: Filter): Promise<DocumentModel.DocumentModel[]> {
        let subpath: string = `${this.subpath}/models`;
        if (filter) {
            const qs = new URLSearchParams();
            qs.append('only', filter.only.join(','));
            subpath += `?${qs.toString()}`;
        }
        try {
            const resp = await reyahServiceRequest.get(subpath, true);
            return newDocumentModels(resp.data.models);
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
            return newDocumentModel(resp.data);
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
            return newDocumentModel(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Deletes an existing model
     * @param id The document model id to delete
     * @return A promise of the result of the document model deletion transaction
     */
    public async delete(id: number): Promise<boolean> {
        const subpath: string = `${this.subpath}/models/${id}`;
        try {
            await reyahServiceRequest.delete(subpath, true);
            return true;
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Retrieves the preview file associated to a document model
     * @param id The document model id
     * @return A promise of the result of the preview file retrieving transaction
     */
    public async previewUrl(id: number): Promise<DocumentModel.PreviewURL> {
        const subpath: string = `${this.subpath}/models/${id}/preview`;
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.get(subpath, true);
            return newPreviewUrl(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Sets the preview file associated to a document model
     * @param request Information of the preview file of the document model
     * @return A promise of the result of the preview file setting transaction
     */
    public async setPreview(request: DocumentModel.IdWithContentTypeRequest): Promise<DocumentModel.PreviewURL> {
        const subpath: string = `${this.subpath}/models/${request.id}/preview`;
        try {
            const resp: ReyahRequestResponse = await reyahServiceRequest.patch(subpath, request, true);
            return newPreviewUrl(resp.data);
        } catch (err) {
            throw dispatchError(err);
        }
    }

    /**
     * Deletes the preview file associated to a document model
     * @param id The document model id
     * @return A promise of the result of the preview file deletion transaction
     */
    public async deletePreview(id: number): Promise<boolean> {
        const subpath: string = `${this.subpath}/models/${id}/preview`;
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
