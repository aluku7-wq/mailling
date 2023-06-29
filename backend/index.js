import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { router } from "./routes/uathRoute.js";
import dotenv from "dotenv";

import dbConnect from "./config/db.js";
// intialise dotenv
dotenv.config();
// initialise express
const app = express();
// setting up cors
// run database connection
dbConnect();
// allow cors between 3000 and 5000 ports
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
// set body passer for json and urlecoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// routes
app.use("/api/users", router);
// call error handling middleware
app.use(errorHandler);
app.listen(5000, () => {
  console.log("app running on port 5000");
});
