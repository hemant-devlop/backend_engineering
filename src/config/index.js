import env from "./env/index.js";
import { createAppConfig } from "./app/app.config.js";
import { createAuthConfig } from "./auth/auth.config.js";
import { createDatabaseConfig } from "./database/database.config.js";
import { createCookieConfig } from "./cookie/cookie.config.js";
import { createLoggerConfig } from "./logger/logger.config.js";
import { createSecurityConfig } from "./security/security.config.js";
import { deepFreeze } from "../shared/utils/deep-freeze.js";

export const config = deepFreeze({

    app:
        createAppConfig(env),

    auth:
        createAuthConfig(env),

    database:
        createDatabaseConfig(env),

    cookie:
        createCookieConfig(env),

    logger:
        createLoggerConfig(env),

    security:
        createSecurityConfig(env),
    

});

export default config;