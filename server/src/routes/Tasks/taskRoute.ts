import { Router } from "express";
import { roleAuthMiddleware } from "../../middleware/authentication/roleAuthMiddleware";
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

router.patch(
  "/tasks/:id",
  roleAuthMiddleware(["admin", "user"]),
  upload.array("newFiles", 10),
  updateTask
);

router.delete("/tasks", roleAuthMiddleware(["admin"]), deleteTask);

module.exports = router;
