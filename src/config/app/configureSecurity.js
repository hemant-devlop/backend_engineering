import helmet from "helmet";
import config from "../index.js";

export function configureSecurity(app){
    app.disable('x-powered-by');
    app.set('trust proxy',config.security.trustProxy)
    app.use(helmet())
}