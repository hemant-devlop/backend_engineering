// src/lib/database/database.manager.js

import config from "../../config/index.js";
import {
  connectDatabase,
  disconnectDatabase,
} from "./database.connection.js";

import { registerDatabaseEvents } from "./database.events.js";
import { getDatabaseHealth } from "./database.helth.js";

// import { getDatabaseHealth } from "./database.health.js";

class DatabaseManager {
  #isConnected = false;

  // async connect() {
  //   if (this.#isConnected) {
  //     return;
  //   }

  //   registerDatabaseEvents();

  //   await connectDatabase();

  //   this.#isConnected = true;
  // }

  async initialize() {

    if (this.#isConnected) {
      return;
    }

    registerDatabaseEvents();

    let attempts = 0;

    while (attempts < config.database.retryLimit) {

      try {

        await connectDatabase();

        this.#isConnected = true;

        return;

      }

      catch (error) {

        attempts++;

        console.log(
          `Database Connection Failed (${attempts}/${config.database.retryLimit})`
        );

        if (attempts >= config.database.retryLimit) {

          throw error;

        }

        await new Promise(resolve =>
          setTimeout(resolve, config.database.retryDelay)
        );

      }

    }

  }

  async disconnect() {
    if (!this.#isConnected) {
      return;
    }

    await disconnectDatabase();

    this.#isConnected = false;
  }

  health() {
    return getDatabaseHealth();
  }

  get isConnected() {
    return this.#isConnected;
  }
}

export const database = new DatabaseManager();



