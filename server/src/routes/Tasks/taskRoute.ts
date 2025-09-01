import { Router, Request, Response } from "express";
const { addTask } = require("../../controllers/TaskController/taskController");

const router = Router();

router.post("/tasks", addTask);

module.exports = router;
