import compression from "compression";
import cors from 'cors'
import express from 'express'
import cookieParser from "cookie-parser";

import config from "../index.js";

import { requestIdMiddleware } from "../../middlewares/requestId.middleware.js";
import { requestLoggerMiddleware } from "../../middlewares/reqLoggerMiddleware.js";

export function configureMiddleware(app){

    app.use(requestIdMiddleware)
    app.use(requestLoggerMiddleware)
    app.use(cors(config.security.cors))
    app.use(compression())
    app.use(cookieParser())
    app.use(express.json({limit:'100kb'}))
    app.use(express.urlencoded({
        extended:true,
        limit:'100kb'
    }))

}