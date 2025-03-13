const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/events");
const userRoutes = require("./routes/users");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/events", eventRoutes);
app.use("/users", userRoutes);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Start the server only if not in a test environment
if (process.env.NODE_ENV !== "test") {
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export app for testing
module.exports = app;
