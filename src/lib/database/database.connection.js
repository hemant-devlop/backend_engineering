// src/lib/database/database.connection.js

import mongoose from "mongoose";

import { databaseOptions } from "./database.options.js";
import config from "../../config/index.js"

export async function connectDatabase() {
  return mongoose.connect(
    config.database.uri,
    databaseOptions
  );
}

export async function disconnectDatabase() {
  return mongoose.disconnect();
}

export { mongoose };