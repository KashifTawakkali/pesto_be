const Task = require('../models/taskModel');

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

    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
