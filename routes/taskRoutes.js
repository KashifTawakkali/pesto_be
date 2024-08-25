// routes/taskRoutes.js
const express = require('express');
const { createTask } = require('../controllers/taskController');
const { updateTaskStatus } = require('../controllers/updateTaskController');
const { getAllTasks } = require('../controllers/getTaskController');
const { deleteTaskById } = require('../controllers/deleteTaskController');  

const router = express.Router();

router.post('/create', createTask);
router.post('/update', updateTaskStatus);
router.get('/all', getAllTasks);
router.delete('/delete', deleteTaskById);  

module.exports = router;
