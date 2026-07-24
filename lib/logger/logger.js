import winston
from "winston";

import {

consoleTransport,

applicationTransport,

errorTransport,

} from "./transports.js";

export const logger =
winston.createLogger({

level:"info",

defaultMeta:{

service:"authentication-service",

},

transports:[

consoleTransport,

applicationTransport,

errorTransport,

],

exitOnError:false,

});