const dotenv = require('dotenv');  // For CommonJS modules
dotenv.config();  // Loads environment variables from the .env file
const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');
const userRoutes = require('./Routes/userRoutes');
const alertRoutes = require('./Routes/alertRoutes');
const problemRoutes = require('./Routes/problemRoutes');

// Initialize app and middleware
const app = express();
app.use(cors());  // Enable CORS for all requests
app.use(express.json({ limit: '10mb' }));  // Handle JSON requests with a 10mb size limit
app.use(express.urlencoded({ limit: '10mb', extended: true }));  // Handle URL-encoded requests with a 10mb size limit
app.use('/api/problems', problemRoutes);


// Connect to MongoDB
connectDB();  // Assuming the `connectDB` function correctly connects to your MongoDB database

// Set up routes
app.use('/user', userRoutes);  // User-related routes
app.use('/send-aqi-alert', alertRoutes);  // AQI alert routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
