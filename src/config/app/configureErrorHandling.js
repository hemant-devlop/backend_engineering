import errorMiddleware from "../../middlewares/error.middleware.js";

export function configureErrorHandling(app) {
    app.use(errorMiddleware)
}