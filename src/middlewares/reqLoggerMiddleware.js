// import logger from "../config/logger.js";

export const requestLoggerMiddleware = (req, res, next) => {
    const start = process.hrtime.bigint();

    console.log("Incoming Request", {
        requestId: req.id,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get("User-Agent"),
    });

    res.on("finish", () => {
        const end = process.hrtime.bigint();

        const duration =
            Number(end - start) / 1_000_000;

        console.log("Request Completed", {
            requestId: req.id,
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            responseTime: `${duration.toFixed(2)} ms`,
        });
    });

    next();
};