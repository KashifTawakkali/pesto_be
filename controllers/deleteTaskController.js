// controllers/deleteTaskController.js
const Task = require('../models/taskModel');

exports.deleteTaskByNumber = async (req, res) => {
  const { taskNumber } = req.body;

  if (!taskNumber) {
    return res.status(400).json({ message: 'Task number is required' });
  }

  try {
    const task = await Task.findOneAndDelete({ taskNumber });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
