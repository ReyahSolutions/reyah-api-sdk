import Job from './services/job';
import DocumentModel from './services/documentModel';
import DataModel from './services/dataModel';
import DataType from './services/dataType';
import Profile from './services/profile';
import AuthHandler from './authentication/authentication';
import { Config } from './core/config';

export * from './types/authentication';
export * from './types/core';
export * from './types/dataModel';
export * from './types/dataType';
export * from './types/documentModel';
export * from './types/errors';
export * from './types/filter';
export * from './types/job';
export * from './types/profile';
export * from './types/reyah';
export * from './types/status';

export const Reyah = {
    Job,
    DocumentModel,
    DataModel,
    DataType,
    Profile,
    Config,
    Auth: AuthHandler,
};
export default Reyah;
