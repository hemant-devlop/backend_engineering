// security.config.js

export const createSecurityConfig = (env) => {

    return Object.freeze({

        bcryptRounds:
            env.BCRYPT_ROUNDS,

    });

};