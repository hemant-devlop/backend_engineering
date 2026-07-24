// src/lib/database/database.health.js

import { mongoose } from "./database.connection.js";

export function getDatabaseHealth() {
  const { connection } = mongoose;

  return Object.freeze({
    connected: connection.readyState === 1,

    readyState: connection.readyState,

    host: connection.host,

    database: connection.name,
  });
}

// 0 = Disconnected

// 1 = Connected

// 2 = Connecting

// 3 = Disconnecting