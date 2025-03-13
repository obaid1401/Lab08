const request = require("supertest");
const app = require("../server"); // Adjust if needed

describe("Event API Tests", () => {
    let token;

    beforeAll(async () => {
        const res = await request(app)
            .post("/users/login")
            .send({ username: "testuser", password: "password123" });

        token = res.body.token;
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

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("event");
    });

    it("Should get all events", async () => {
        const res = await request(app)
            .get("/events/")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("Should delete an event", async () => {
        const res = await request(app)
            .delete("/events/1") // Adjust ID as needed
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Event deleted successfully");
    });
});
