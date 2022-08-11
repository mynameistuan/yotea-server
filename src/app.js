import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import morgan from "morgan";
import { readdirSync } from "fs";
import mongoose from "mongoose";
require("dotenv").config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("finishOrder", (data) => {
    io.emit("newOrder", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

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
  .connect(process.env.DB_URL)
  .then(() => console.log("Connect successfully"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log("Server is running on port", PORT));
