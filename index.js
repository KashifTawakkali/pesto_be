const events = require('events');
events.EventEmitter.defaultMaxListeners = 20;

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Load environment variables from .env file
dotenv.config();

// Database connection
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins (use cautiously in production)
app.use(express.json()); // Parse JSON bodies

// Log environment variables for debugging
console.log(`Database URL: ${process.env.URL}`);
console.log(`Database Name: ${process.env.DBNAME}`);
console.log(`Database User: ${process.env.USERNAME}`);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Test Route (for troubleshooting)
app.get('/api/v1/auth/test', (req, res) => {
  res.send('Test route works!');
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
