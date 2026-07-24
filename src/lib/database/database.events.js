import { mongoose } from "./database.connection.js";

export function registerDatabaseEvents() {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("MongoDB Reconnected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB Error");

    console.error(error);
  });
}