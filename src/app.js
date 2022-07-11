import express from "express";
import cors from "cors";
import morgan from "morgan";
import { readdirSync } from "fs";
import mongoose from "mongoose";
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
readdirSync("./src/routes").forEach((routes) => {
  app.use("/api", require(`./routes/${routes}`));
});

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: false,
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

// connect
mongoose
  .connect("mongodb://localhost:27017/yotea")
  .then(() => console.log("Connect successfully"))
  .catch((err) => console.log(err));

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
