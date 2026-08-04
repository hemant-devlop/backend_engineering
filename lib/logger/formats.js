import winston from "winston";

const { combine, timestamp, errors, json, colorize, printf, metadata } =
    winston.format;

const developmentFormat = printf(({ level, message, stack, ...meta }) => {
    const extraMeta = Object.entries(meta).filter(
        ([key, value]) => value !== undefined && key !== "service"
    );

    const details = extraMeta.length > 0 ? ` ${JSON.stringify(Object.fromEntries(extraMeta))}` : "";

    return `${level}: ${stack || message}${details}`;
});

export const consoleFormat = combine(
    colorize({ all: true }),
    timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }),
    errors({
        stack: true,
    }),
    metadata(),
    developmentFormat
);

export const fileFormat = combine(
    timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }),
    errors({
        stack: true,
    }),
    metadata(),
    json()
);