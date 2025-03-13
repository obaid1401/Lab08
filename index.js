const express = require("express");
const bodyParser = require("body-parser");
const eventRoutes = require("./routes/events");
const userRoutes = require("./routes/users");

const app = express();
app.use(bodyParser.json());

app.use("/events", eventRoutes);
app.use("/users", userRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
