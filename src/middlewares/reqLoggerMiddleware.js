import { logger } from "../../lib/logger/index.js";

export const buildRequestLogContext = (req, res, phase) => ({
    requestId: req.id,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get?.("User-Agent"),
    phase,
    statusCode: res.statusCode,
});

export const requestLoggerMiddleware = (req, res, next) => {
    const start = process.hrtime.bigint();

    logger.info("Incoming request", buildRequestLogContext(req, res, "started"));

    res.once("finish", () => {
        const end = process.hrtime.bigint();
        const duration = Number(end - start) / 1_000_000;
        const level = res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";
        const payload = {
            ...buildRequestLogContext(req, res, "completed"),
            responseTime: `${duration.toFixed(2)} ms`,
        };

        logger[level]("Request completed", payload);
    });

    next();
};