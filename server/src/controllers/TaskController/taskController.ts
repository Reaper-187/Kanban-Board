import { Request, Response } from "express";
const Task = require("../../models/TaskSchema");

exports.addTask = async (req: Request, res: Response) => {
  try {
    const taskData = new Task({
      ...req.body,
    });

    console.log("req.body", req.body);
    console.log("taskdata", taskData);

    const savedTask = await taskData.save();

    res.status(201).json(savedTask);
  } catch (error) {
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

exports.updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

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
