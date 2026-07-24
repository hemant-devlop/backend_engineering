

export const createDatabaseConfig = (env) =>
    Object.freeze({

        uri: env.DB_URI,

        database: env.DB_NAME,

        retryLimit: env.DB_RETRY_LIMIT,

        retryDelay: env.DB_RETRY_DELAY,

    });
