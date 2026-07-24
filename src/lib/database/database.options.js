// database.options.js


import config from "../../config/index.js";

export const databaseOptions = Object.freeze({

    dbName:
        config.database.database,

    autoIndex:false,

    maxPoolSize:20,

    minPoolSize:5,

    connectTimeoutMS:10000,

    socketTimeoutMS:4500,

    serverSelectionTimeoutMS:10000,

    heartbeatFrequencyMS: 10000,

    family: 4,

});