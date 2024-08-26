// controllers/updateTaskController.js
const Task = require('../models/taskModel');

exports.updateTaskStatusByNumber = async (req, res) => {
  const { taskNumber, status } = req.body;

  if (!taskNumber || !status) {
    return res.status(400).json({ message: 'Task number and status are required' });
  }

  const validStatuses = ['New', 'In Progress', 'On Hold', 'Complete', 'Reopened'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const task = await Task.findOneAndUpdate(
      { taskNumber },
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task status updated successfully', task });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
