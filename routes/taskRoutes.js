// routes/taskRoutes.js
const express = require('express');
const { createTask } = require('../controllers/taskController');
const { updateTaskStatusByNumber } = require('../controllers/updateTaskController');
const { getAllTasks } = require('../controllers/getTaskController');
const { deleteTaskByNumber } = require('../controllers/deleteTaskController');  

const router = express.Router();

router.post('/create', createTask);
router.post('/update', updateTaskStatusByNumber);  
router.get('/all', getAllTasks);
router.delete('/delete', deleteTaskByNumber);  

module.exports = router;
