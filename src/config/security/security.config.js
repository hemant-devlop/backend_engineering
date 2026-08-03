// security.config.js

export const createSecurityConfig = (env) => {

    return Object.freeze({

        bcryptRounds: env.BCRYPT_ROUNDS,
        trustProxy: false,
        cors: {
            origin: [
                "http://localhost:3000",
                "https://myapp.com"
            ],
            credentials: true,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
            exposedHeaders: [],
            maxAge: 86400
        }

    });

};