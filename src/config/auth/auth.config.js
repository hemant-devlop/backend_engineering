// auth.config.js

export const createAuthConfig = (env) => {

    return Object.freeze({

        accessToken:
            env.JWT_ACCESS_TOKEN,

        refreshToken:
            env.JWT_REFRESH_TOKEN,

        accessExpires:
            env.JWT_ACCESS_EXPIRES,

        refreshExpires:
            env.JWT_REFRESH_EXPIRES,

    });

};