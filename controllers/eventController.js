const events = require("../data/events");

const reminders = [];

exports.createEvent = (req, res) => {
    const { name, description, date, time, category, reminder } = req.body;

    const event = { 
        id: events.length + 1, 
        name, 
        description, 
        date, 
        time, 
        category, 
        reminder 
    };

    events.push(event);

    if (reminder) {
        scheduleReminder(event);
    }

    res.status(201).json({ message: "Event created", event });
};

exports.getEvents = (req, res) => {
    let { sortBy } = req.query;
    
    let sortedEvents = [...events]; 

    if (sortBy) {
        if (sortBy === "date") {
            sortedEvents.sort((a, b) => new Date(a.date + "T" + a.time) - new Date(b.date + "T" + b.time));
        } else if (sortBy === "category") {
            sortedEvents.sort((a, b) => a.category.localeCompare(b.category));
        } else if (sortBy === "reminder") {
            sortedEvents.sort((a, b) => (a.reminder || 0) - (b.reminder || 0));
        } else {
            return res.status(400).json({ message: "Invalid sortBy parameter. Use 'date', 'category', or 'reminder'." });
        }
    }

    res.json(sortedEvents);
};


function scheduleReminder(event) {
    const eventTime = new Date(`${event.date}T${event.time}`).getTime();
    const reminderTime = eventTime - event.reminder * 60 * 1000; 
    const now = Date.now();

    if (reminderTime > now) {
        const timeoutId = setTimeout(() => {
            console.log(`Reminder: Your event "${event.name}" is starting soon!`);
        }, reminderTime - now);

        reminders.push({ eventId: event.id, timeoutId });
    }
}


exports.deleteEvent = (req, res) => {
    const { id } = req.params;
    const index = events.findIndex(event => event.id == id);

    if (index === -1) {
        return res.status(404).json({ message: "Event not found" });
    }

    const reminderIndex = reminders.findIndex(r => r.eventId == id);
    if (reminderIndex !== -1) {
        clearTimeout(reminders[reminderIndex].timeoutId);
        reminders.splice(reminderIndex, 1);
    }

    events.splice(index, 1);
    res.json({ message: "Event deleted successfully" });
};
