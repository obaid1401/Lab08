const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/events");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/events", eventRoutes);
app.use("/users", userRoutes);


app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});


if (process.env.NODE_ENV !== "test") {
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
