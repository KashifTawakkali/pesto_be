const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
  const { taskName, taskDescription, assignee, accountable, deadline } = req.body;

  if (!taskName || !taskDescription || !assignee || !accountable || !deadline) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const task = new Task({
      taskName,
      taskDescription,
      assignee,
      accountable,
      deadline
    });

    await task.save();

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
