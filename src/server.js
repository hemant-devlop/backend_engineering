import http from "http";
import app from "./app.js";
import config from "./config/index.js";
import { database } from "./lib/database/index.js";
import { logger } from "../lib/logger/index.js";

const server = http.createServer(app);

async function bootstrap() {
    await database.initialize();

    await new Promise((resolve) => {
        server.listen(config.app.port, resolve);
    });

    logger.info("Application started", {
        event: "APPLICATION_STARTED",
        port: config.app.port,
        environment: config.app.env,
        processId: process.pid,
        nodeVersion: process.version,
    });
}

bootstrap().catch((error) => {
    logger.error("Application bootstrap failed", {
        error,
    });

    process.exit(1);
});