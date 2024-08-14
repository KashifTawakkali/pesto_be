const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  assignee: {
    type: String,
    required: true,
  },
  accountable: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  deadline: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
