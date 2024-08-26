const Task = require('../models/taskModel');

// Create Task Controller
exports.createTask = async (req, res) => {
  const { taskName, taskDescription, assignee, accountable, deadline } = req.body;

  // Validate required fields
  if (!taskName || !taskDescription || !assignee || !accountable || !deadline) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate the deadline date
  const deadlineDate = new Date(deadline);
  if (isNaN(deadlineDate.getTime())) {
    return res.status(400).json({ message: 'Invalid date format for deadline' });
  }

  try {
    // Create the task
    const task = new Task({
      taskName,
      taskDescription,
      assignee,
      accountable,
      status: 'New', 
      deadline: deadlineDate,
    });

    // Save the task to the database
    await task.save();

    // Respond with success
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    // Log the detailed error for debugging
    console.error('Error creating task:', error);

    // Respond with a generic error message and the original error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
