const express = require("express"); 
const { createEvent, getEvents, deleteEvent } = require("../controllers/eventController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/create", auth, createEvent);
router.get("/", auth, getEvents);
router.delete("/:id", auth, deleteEvent); // <-- Added DELETE route

module.exports = router;
