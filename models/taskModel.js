const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskDescription: { type: String, required: true },
  assignee: { type: String, required: true },
  accountable: { type: String, required: true },
  status: { type: String, default: 'pending' },
  deadline: { type: Date, required: true }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
