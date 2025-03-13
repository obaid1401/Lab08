const request = require("supertest");
const app = require("../server"); // Adjust if needed

describe("User Authentication Tests", () => {
    it("Should register a new user", async () => {
        const res = await request(app)
            .post("/users/register")
            .send({
                username: "testuser",
                password: "password123"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("User registered");
    });

    it("Should not register an existing user", async () => {
        const res = await request(app)
            .post("/users/register")
            .send({
                username: "testuser",
                password: "password123"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("User already exists");
    });

    it("Should log in a registered user", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({
                username: "testuser",
                password: "password123"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });

    it("Should not log in with wrong credentials", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({
                username: "testuser",
                password: "wrongpassword"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Invalid username or password");
    });
});
