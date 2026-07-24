import winston from "winston";

import DailyRotateFile
from "winston-daily-rotate-file";

import {

consoleFormat,

fileFormat,

} from "./formats.js";

export const consoleTransport =
new winston.transports.Console({

format: consoleFormat,

});

export const applicationTransport =
new DailyRotateFile({

filename:
"logs/application/application-%DATE%.log",

datePattern:
"YYYY-MM-DD",

maxFiles:
"30d",

maxSize:
"20m",

format:
fileFormat,

});

export const errorTransport =
new DailyRotateFile({

level:
"error",

filename:
"logs/application/error-%DATE%.log",

datePattern:
"YYYY-MM-DD",

maxFiles:
"30d",

maxSize:
"20m",

format:
fileFormat,

});