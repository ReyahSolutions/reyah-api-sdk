import Job from "./services/job";
import DocumentModel from "./services/documentModel"
import DataModel from "./services/dataModel";
import Authentication from "./services/authentication";

export * from "./types/authentication";
export * from "./types/core";
export * from "./types/dataModel";
export * from "./types/documentModel";
export * from "./types/errors";
export * from "./types/job";
export * from "./types/reyah";

export const Reyah = {
    Job,
    DocumentModel,
    DataModel,
    Authentication
};
export default Reyah;