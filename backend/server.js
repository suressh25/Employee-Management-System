const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load .env variables

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Mock route
app.get("/api/employees", (req, res) => {
  res.json({ message: "API is working!" });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API!" });
}); 

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
