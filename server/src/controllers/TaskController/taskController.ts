import { Request, Response } from "express";
import { UploadedFile } from "../../types/types";
import fs from "fs/promises";
const Task = require("../../models/TaskModel/TaskSchema");
const Log = require("../../models/Acitvity-Logs/LogsScheama");
const User = require("../../models/UserModel/UserSchema");
const Guest = require("../../models/UserModel/GuestSchema");

interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}

exports.addTask = async (req: MulterRequest, res: Response) => {
  try {
    const { ...taskData } = req.body;
    const { userId: _id, userRole } = req.session;
    const newFiles = req.files;

    if (userRole === "guest" && newFiles && newFiles.length > 0) {
      return res.status(400).json({ message: "Guests cannot add files" });
    }

    const user =
      userRole === "guest"
        ? await Guest.findOne({ _id })
        : await User.findOne({ _id });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

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
    const { userId, userRole, lastName } = req.session;
    const updates = req.body;

    if (userRole === "guest" && files && files.length > 0) {
      return res.status(400).json({ message: "Guests cannot add files" });
    }

    // Aktuellen task nochmal holen für die files
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const changes: { [key: string]: { old: any; new: any } } = {};

    const updateKeys = Object.keys(updates);

    for (const key of updateKeys) {
      const oldValue = task[key];
      const newValue = updates[key];
      if (oldValue !== newValue) {
        // ...speicherst du den Unterschied in 'changes'
        changes[key] = {
          old: oldValue,
          new: newValue,
        };
      }
    }

    const newLog = new Log({
      taskId: id,
      userLastName: lastName,
      userId: userId,
      payload: changes,
    });

    await newLog.save();

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

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

exports.deleteTask = async (req: Request, res: Response) => {
  try {
    // const { id } = req.params;
    const { _id } = req.body;
    const uploadDir = "uploads/docs";
    const filesInFolder = await fs.readdir(uploadDir);

    // const task = await Task.findById({ _id: id });
    const tasksToDelete = await Task.find({ _id: { $in: _id } });
    const extractingFiles = tasksToDelete
      .map((eachPath: any) => eachPath.file)
      .flat(1);
    const filesToDeleteFromUploads = extractingFiles.map(
      (f: Partial<UploadedFile>) => {
        return f.path;
      }
    );

    console.log(filesToDeleteFromUploads);

    for (const filePath of filesToDeleteFromUploads) {
      const fileName = filePath.split("/").pop(); // Nur den Dateinamen extrahieren
      if (filesInFolder.includes(fileName)) {
        await fs.unlink(`${uploadDir}/${fileName}`);
        console.log("Gelöscht:", fileName);
      }
    }

    const deleteTask = await Task.deleteMany({ _id: { $in: _id } });

    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(deleteTask);
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

exports.createComment = async (req: Request, res: Response) => {
  try {
    const userId = "123456";
    const userName = "Sample-Name";
    const { id } = req.params;

    const newComment = {
      userId,
      userName,
      text: req.body.text,
      timeStamp: new Date(),
    };

    const newTaksComment = await Task.findByIdAndUpdate(
      id,
      { $push: { comment: newComment } },
      { new: true }
    );
    if (!newTaksComment)
      return res.status(404).json({ message: "Task not found" });

    res.status(200).json(newTaksComment);
  } catch (err) {
    console.error("Error beim Erstellen des Comments:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getTaskComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    const allComments = task.comment;

    if (!allComments)
      return res.status(404).json({ message: "no comments for this Task" });

    res.status(200).json(allComments);
  } catch (err) {
    console.error("Error beim laden der Comments:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getLogAcitvity = async (req: Request, res: Response) => {
  try {
    const { id: taskId } = req.params;

    const logsForTask = await Log.findOne({ taskId });

    if (!logsForTask)
      return res.status(400).json({ message: "no logs avaylible" });

    res.status(200).json(logsForTask);
  } catch (err) {
    console.error("Error beim laden der logs:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
