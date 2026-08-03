
import http from 'http'
import app from "./app.js";
import config from "./config/index.js";
import { database } from "./lib/database/index.js";
// import logger from "./lib/logger/index.js";//pending

const server = http.createServer(app);

async function bootstrap() {

    await database.initialize();

    await new Promise((resolve) => {
        server.listen(config.app.port, resolve);
    });

    console.log({
        event: "APPLICATION_STARTED",
        port: config.app.port,
        environment: config.app.env,
        processId: process.pid,
        nodeVersion: process.version,
    });

}

bootstrap().catch((error) => {

    console.log(error)

    process.exit(1);

});