import { Router, Request, Response } from "express";
const {
  addTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../../controllers/TaskController/taskController");
const upload = require("../../middleware/multer/uploadMiddleware");
const router = Router();

router.post("/tasks", upload.array("file", 10), addTask);

router.get("/tasks", getTask);

router.patch("/tasks/:id", upload.array("newFiles", 10), updateTask);

router.delete("/tasks", deleteTask);

module.exports = router;
