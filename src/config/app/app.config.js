// src/config/app/app.config.js

export const createAppConfig = (env) => {
    return Object.freeze({
        name: env.APP_NAME,

        env: env.NODE_ENV,

        port: env.PORT,

        clientUrl: env.CLIENT_URL,

        isDevelopment:
            env.NODE_ENV === "development",

        isProduction:
            env.NODE_ENV === "production",

        isTest:
            env.NODE_ENV === "test",
    });
};