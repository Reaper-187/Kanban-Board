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

app.use(express.json());
app.use(cors());

app.use("/api", taskRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Kanban with Middleware!");
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
