import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
// Set path for .env variable
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./config.env" });
}

// database credentials
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
// Connect to database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("MongoDB connected."))
  .catch((err) => console.log(`Error: ${err}`));

// Server running on port
const server = app.listen(process.env.PORT, () =>
  console.log(`Server running on port: ${process.env.PORT}`)
);

// my safety net for any forgotten errs
process.on("unhandledRejection", (err) => {
  console.log(`${err.name}: ${err.message}`);
  console.log("UNHANDLED REJECTION! SHUTTING DOWN....");
  // server.close() stops the server, any code that is pending will finish executing, process.exit(1) means error app crash.
  server.close(() => process.exit(1));
});
process.on("uncaughtException", (err) => {
  console.log(`${err.name}: ${err.message}`);
  console.log("UNCAUGHT EXCEPTION! SHUTTING DOWN....");
  // server.close() stops the server, any code that is pending will finish executing, process.exit(1) means error app crash.
  server.close(() => process.exit(1));
});
