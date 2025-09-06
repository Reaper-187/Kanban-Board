import { Router, Request, Response } from "express";
const {
  addTask,
  getTask,
} = require("../../controllers/TaskController/taskController");

const router = Router();

router.post("/tasks", addTask);

router.get("/tasks", getTask);

module.exports = router;
