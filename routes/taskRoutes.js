const express = require('express');
const { createTask } = require('../controllers/taskController');
const { updateTaskStatus } = require('../controllers/updateTaskController');
const { getAllTasks } = require('../controllers/getTaskController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new task
router.post('/create', auth, createTask);

// Route to update task status
router.post('/update-status', auth, updateTaskStatus);

// Route to get all tasks
router.get('/all', auth, getAllTasks);

module.exports = router;
