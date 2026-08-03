import express from "express";

import { configureSecurity } from "./config/app/configureSecurity.js";
import { configureMiddleware } from "./config/app/configureMiddleware.js";
import { configureRoutes } from "./config/app/configureRoutes.js";
import { configureErrorHandling } from "./config/app/configureErrorHandling.js";

const app = express()

configureSecurity(app);
configureMiddleware(app);
configureRoutes(app);
configureErrorHandling(app)

export default app;