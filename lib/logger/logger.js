import winston from "winston";

import {
    consoleTransport,
    applicationTransport,
    errorTransport,
} from "./transports.js";

const defaultLevel = process.env.LOG_LEVEL || "info";
const defaultService = process.env.APP_NAME || "authentication-service";

export const logger = winston.createLogger({
    level: defaultLevel,
    defaultMeta: {
        service: defaultService,
    },
    transports: [
        consoleTransport,
        applicationTransport,
        errorTransport,
    ],
    exitOnError: false,
    handleExceptions: true,
});