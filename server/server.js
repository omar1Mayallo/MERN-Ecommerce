import _ from "colors";

//______UNCAUGHT_EXCEPTIONS______//
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT_EXCEPTIONS! Server Shutting down...");
  process.exit(1);
});
import app from "./app.js";
import connectToDB from "./config/db.js";

//______DB_CONNECTING______//
connectToDB();

//______SERVER______//
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(
    `App Running on PORT:${PORT} in ${process.env.NODE_ENV} mode`.blue.bold
  );
});

//______UNHANDLED_REJECTIONS______//
//@desc unhandled promises rejections (outside express app [inside express we have global error handling], ex: connectToDB)
process.on("unhandledRejection", (err) => {
  console.error(err.name, err.message);
  server.close(() => {
    console.log("UNHANDLED_REJECTIONS! Server Shutting down...");
    process.exit(1);
  });
});
