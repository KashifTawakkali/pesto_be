const Task = require('../models/taskModel');

// Create Task
exports.createTask = async (req, res) => {
  const { taskName, taskDescription, assignee, accountable, deadline } = req.body;

  if (!taskName || !taskDescription || !assignee || !accountable || !deadline) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const deadlineDate = new Date(deadline);
  if (isNaN(deadlineDate.getTime())) {
    return res.status(400).json({ message: 'Invalid date format for deadline' });
  }

  try {
    const task = new Task({
      taskName,
      taskDescription,
      assignee,
      accountable,
      status: 'pending',
      deadline: deadlineDate,
    });

    await task.save();

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update Task Status
exports.updateTaskStatus = async (req, res) => {
  const { taskId, status } = req.body;

  const validStatuses = ['pending', 'in-progress', 'on-hold', 'completed', 'reopened'];

  if (!taskId || !status) {
    return res.status(400).json({ message: 'Task ID and status are required' });
  }

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ message: 'Task status updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get All Tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
