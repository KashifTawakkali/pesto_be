const events = require('events');
events.EventEmitter.defaultMaxListeners = 20;
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

console.log(`Database URL: ${process.env.URL}`);
console.log(`Database Name: ${process.env.DBNAME}`);
console.log(`Database User: ${process.env.USERNAME}`);

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // If you need to parse JSON bodies

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
