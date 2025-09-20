import { Request, Response } from "express";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const taskRoute = require("./routes/Tasks/taskRoute");
const { connectToDB } = require("./config/dbConnection");

const app = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", taskRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Backend running");
});

async function startServer() {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Server running at: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
  }
}

startServer();
