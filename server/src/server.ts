import { Request, Response } from "express";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { connectToDB } = require("./config/dbConnection");
const MongoStore = require("connect-mongo");
const taskRoute = require("./routes/Tasks/taskRoute");
const authRouter = require("./routes/Auth/authRouter");
const app = express();

app.set("trust proxy", 1);

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  session({
    name: "connect.sid",
    secret: process.env.VITE_SECRET_KEY,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60000 * 60,
      sameSite: "lax",
    },
  })
);

app.use(express.json());

app.use("/api", authRouter);
app.use("/api", taskRoute);
app.use("/uploads", express.static("uploads"));

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
