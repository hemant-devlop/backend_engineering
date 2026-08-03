import apiRouter from "../../routes/index.js"

import healthRoute from '../../routes/health.route.js'

export function configureRoutes(app) {

    app.use("/health", healthRoute);

    app.use("/api/v1", apiRouter);

}