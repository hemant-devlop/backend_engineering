import winston from "winston";

const { combine, timestamp, errors, json, colorize, printf } =
  winston.format;

const developmentFormat = printf(
    ({
        timestamp,
        level,
        message,
        stack,
    }) => {

        return `${timestamp} ${level}: ${stack || message}`;
    }
);

export const consoleFormat = combine(

    colorize(),

    timestamp({

        format: "YYYY-MM-DD HH:mm:ss",
    }),

    errors({

        stack: true,
    }),

    developmentFormat

);

export const fileFormat = combine(

    timestamp(),

    errors({

        stack: true,
    }),

    json()

);