import winston from "winston";

import DailyRotateFile from "winston-daily-rotate-file";

import { consoleFormat, fileFormat } from "./formats.js";

const logLevel = process.env.LOG_LEVEL || "info";

export const consoleTransport = new winston.transports.Console({
    level: logLevel,
    format: consoleFormat,
});

const fileTransportOptions = {
    dirname: "logs/application",
    datePattern: "YYYY-MM-DD",
    maxFiles: "30d",
    maxSize: "20m",
    zippedArchive: true,
    format: fileFormat,
};

export const applicationTransport = new DailyRotateFile({
    ...fileTransportOptions,
    filename: "application-%DATE%.log",
});

export const errorTransport = new DailyRotateFile({
    ...fileTransportOptions,
    level: "error",
    filename: "error-%DATE%.log",
});