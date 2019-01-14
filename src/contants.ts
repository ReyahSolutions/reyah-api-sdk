let route = {
    soteria: "https://soteria.api.reyah.eu"
};

let version = {
    soteria: "v1.0"
};

if (process.env.NODE_ENV === "development") {
    route = {
        soteria: "https://soteria.api.staging.reyah.eu"
    };
    version = {
        soteria: "v1.0"
    }
}


export default {
    route,
    version
};