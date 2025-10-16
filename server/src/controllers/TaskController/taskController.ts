import { Request, Response } from "express";
const Task = require("../../models/TaskSchema");

interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}

exports.addTask = async (req: MulterRequest, res: Response) => {
  try {
    const { _id, ...taskData } = req.body;
    const files = req.files;

    const fileInfos = files
      ? files.map((file) => ({
          name: file.originalname,
          path: file.path.split("\\").join("/"),
          type: file.mimetype,
          size: file.size,
        }))
      : [];

    const newTask = new Task({
      ...taskData,
      file: fileInfos,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error in addTask:", error);
    res.status(500).json({ message: "Error adding task", error });
  }
};

exports.getTask = async (req: Request, res: Response) => {
  try {
    const taskCards = await Task.find({});
    res.status(201).json(taskCards);
  } catch (error) {
    res.status(500).json({ message: "Error adding task", error });
  }
};

exports.updateTask = async (req: MulterRequest, res: Response) => {
  try {
    const files = req.files;
    const { id } = req.params;
    const updates = req.body;

    if (files && files.length > 0) {
      const fileData = files.map((f) => ({
        name: f.originalname,
        path: f.path.split("\\").join("/"),
        size: f.size,
      }));

      updates.file = fileData;
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

exports.deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteTask = await Task.deleteOne({ _id: id });

    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(deleteTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};
