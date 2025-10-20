import { Request, Response } from "express";
import { UploadedFile } from "../../types/types";
const Task = require("../../models/TaskSchema");
import fs from "fs/promises";
interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}

exports.addTask = async (req: MulterRequest, res: Response) => {
  try {
    const { _id, ...taskData } = req.body;
    const newFiles = req.files;

    const fileInfos = newFiles
      ? newFiles.map((file) => ({
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

    // Aktuellen task nochmal holen für die files
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Alte files speichern wegen der zsm führung
    const existingFiles = task.file || [];

    const newFiles = files
      ? files?.map((f) => ({
          name: f.originalname,
          path: f.path.split("\\").join("/"),
          size: f.size,
          type: f.mimetype,
        }))
      : [];

    // zsmführung sonst verlierst du beim speichern neuer Files die Alten
    const allFiles = [...existingFiles, ...newFiles];

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      { ...updates, file: allFiles },
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
    const uploadDir = "uploads/docs";
    const filesInFolder = await fs.readdir(uploadDir);

    const task = await Task.findById({ _id: id });
    const filesToDeleteFromUploads = task.file.map(
      (f: Partial<UploadedFile>) => {
        return f.path;
      }
    );

    for (const filePath of filesToDeleteFromUploads) {
      const fileName = filePath.split("/").pop(); // Nur den Dateinamen extrahieren
      if (filesInFolder.includes(fileName)) {
        await fs.unlink(`${uploadDir}/${fileName}`);
        console.log("Gelöscht:", fileName);
      }
    }

    const deleteTask = await Task.deleteOne({ _id: id });

    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(deleteTask);
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
