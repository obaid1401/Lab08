const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../index");

describe("Event API Tests", () => {
    let token;
    let eventId;

    beforeAll(() => {
        
        token = jwt.sign({ username: "testuser" }, "secret", { expiresIn: "1h" });
    });

    it("Should create an event", async () => {
        const res = await request(app)
            .post("/events/create")
            .set("Authorization", `Bearer ${token}`) 
            .send({
                name: "Meeting",
                description: "Project discussion",
                date: "2025-03-20",
                time: "10:00",
                category: "Work",
                reminder: 30
            });

        console.log("Create Event Response:", res.body); 

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("event");
        expect(res.body.event).toHaveProperty("id");

        eventId = res.body.event.id; 
    });

    it("Should get all events", async () => {
        const res = await request(app)
            .get("/events/")
            .set("Authorization", `Bearer ${token}`); 

        console.log("Get Events Response:", res.body); 

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("Should delete an event", async () => {
        if (!eventId) {
            throw new Error("Event ID is missing, cannot run delete test");
        }

        const res = await request(app)
            .delete(`/events/${eventId}`)
            .set("Authorization", `Bearer ${token}`); 

        console.log("Delete Event Response:", res.body); 

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Event deleted successfully");
    });
});
