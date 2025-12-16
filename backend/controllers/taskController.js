const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.status(201).json(task);
};

// GET TASKS
exports.getTasks = async (req, res) => {
  const tasks =
    req.user.role === "admin"
      ? await Task.find().populate("createdBy", "name email")
      : await Task.find({ createdBy: req.user.id });

  res.json(tasks);
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (
    req.user.role !== "admin" &&
    task.createdBy.toString() !== req.user.id
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  Object.assign(task, req.body);
  await task.save();

  res.json(task);
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (
    req.user.role !== "admin" &&
    task.createdBy.toString() !== req.user.id
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  await task.deleteOne();
  res.json({ message: "Task deleted" });
};
