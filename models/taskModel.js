const mongoose = require('mongoose');

// Generate a unique task number (you can customize this logic as needed)
function generateTaskNumber() {
  return `TSK${Date.now().toString().slice(-6)}`;
}

const TaskSchema = new mongoose.Schema({
  taskNumber: {
    type: String,
    required: true,
    unique: true,
    default: generateTaskNumber
  },
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
    default: 'New',
  },
  deadline: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
