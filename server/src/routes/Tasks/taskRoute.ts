import { Router, Request, Response } from "express";
import { authVerification } from "../../middleware/authentication/authenticationMiddleware";
const {
  addTask,
  getTask,
  updateTask,
  deleteTask,
  createComment,
  getTaskComments,
} = require("../../controllers/TaskController/taskController");
const upload = require("../../middleware/multer/uploadMiddleware");
const router = Router();

router.post("/tasks", upload.array("file", 10), addTask);

router.get("/tasks", getTask);

router.get("/tasks/:id", getTaskComments);

router.post("/tasks/:id", createComment);

router.patch("/tasks/:id", upload.array("newFiles", 10), updateTask);

router.delete("/tasks", authVerification(["admin"]), deleteTask);

module.exports = router;
