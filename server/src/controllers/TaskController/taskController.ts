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
