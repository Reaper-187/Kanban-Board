import { Router, Request, Response } from "express";
const {
  addTask,
  getTask,
  updateTask,
} = require("../../controllers/TaskController/taskController");

const router = Router();

router.post("/tasks", addTask);

router.get("/tasks", getTask);

router.patch("/tasks/:id", updateTask);

module.exports = router;
