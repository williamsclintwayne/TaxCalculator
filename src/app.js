const express = require('express');
const cors = require('cors');
const taxRoutes = require('./routes/taxRoutes');
const aiRoutes = require('./routes/aiRoutes'); // Import the AI routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tax', taxRoutes);
app.use('/api/ai', aiRoutes); // Use the AI routes

const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend')));

// Catch-all route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Export the app instance
module.exports = app;
