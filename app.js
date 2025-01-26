const express = require("express");
const connectDB = require("./config/db"); // Connect to MongoDB
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON request body

// Connect to MongoDB
connectDB();

// Import the routes
app.use("/api/voting", require("./routes/voting")); // Use voting routes

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
