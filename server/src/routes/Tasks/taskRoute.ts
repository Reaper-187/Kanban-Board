import { Router } from "express";
import { roleAuthMiddleware } from "../../middleware/authentication/roleAuthMiddleware";
const {
  addTask,
  getTask,
  updateTask,
  deleteTask,
  createComment,
  getTaskComments,
  getLogAcitvity,
} = require("../../controllers/TaskController/taskController");
const upload = require("../../middleware/multer/uploadMiddleware");
const router = Router();

router.post("/tasks/createTask", upload.array("newFiles", 10), addTask);

router.get("/tasks", getTask);

router.get("/tasks/comments/:id", getTaskComments);

router.get("/tasks/logs/:id", getLogAcitvity);

router.post("/tasks/:id", createComment);

router.patch("/tasks/update/:id", upload.array("newFiles", 10), updateTask);

router.delete("/tasks", roleAuthMiddleware(["admin"]), deleteTask);

module.exports = router;
