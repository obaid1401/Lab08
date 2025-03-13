const request = require("supertest");
const app = require("../index");

describe("User Authentication Tests", () => {
    let testUser = {
        username: "testuser",
        password: "password123"
    };

    beforeEach(async () => {
        // Reset user storage (only applicable if using an array instead of a database)
        if (global.usersArray) {
            global.usersArray.length = 0;
        }

        // Register a test user before running login tests
        await request(app).post("/users/register").send(testUser);
    });

    it("Should register a new user", async () => {
        const res = await request(app)
            .post("/users/register")
            .send({
                username: "newuser",
                password: "password456"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("User registered");
    });

    it("Should not register an existing user", async () => {
        const res = await request(app)
            .post("/users/register")
            .send(testUser);

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch(/user already exists/i);
    });

    it("Should log in a registered user", async () => {
        const res = await request(app)
            .post("/users/login")
            .send(testUser);

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
        expect(res.body.message).toMatch(/invalid username or password/i);
    });
});
