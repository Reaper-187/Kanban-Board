import { Request, Response } from "express";
const Task = require("../../models/TaskSchema");

exports.addTask = async (req: Request, res: Response) => {
  try {
    const taskData = new Task({
      ...req.body,
    });

    // const savedTask = await taskData.save();
    console.log(taskData);

    res.status(201).json(taskData);
  } catch (error) {
    res.status(500).json({ message: "Error adding task", error });
  }
};
