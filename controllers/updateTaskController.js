const Task = require('../models/taskModel');

// Update Task Status Controller
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
