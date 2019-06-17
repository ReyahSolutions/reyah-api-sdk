const job = {
    "JOB_MODEL_PROTOCOL": "https",
    "JOB_MODEL_HOSTNAME": "chronos.api.reyah.eu",
    "JOB_MODEL_PORT": "443",
    "JOB_MODEL_VERSION": "v1",
};

const documentModel = {
    "DOCUMENT_MODEL_PROTOCOL": "https",
    "DOCUMENT_MODEL_HOSTNAME": "hera.api.reyah.eu",
    "DOCUMENT_MODEL_PORT": "443",
    "DOCUMENT_MODEL_VERSION": "v1",
};

const dataModel = {
    "DATA_MODEL_PROTOCOL": "https",
    "DATA_MODEL_HOSTNAME": "themis.api.reyah.eu",
    "DATA_MODEL_PORT": "443",
    "DATA_MODEL_VERSION": "v1",
};

export const config: any = {
    documentModel,
    dataModel,
    job
};
export default config;