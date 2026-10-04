const request = require("supertest");
const app = require("../src/app");

describe("Jenkins CI/CD Demo Application", () => {

    test("GET / returns the application", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.text).toContain("Jenkins CI/CD Dashboard");
    });

    test("GET /api/health returns UP", async () => {
        const response = await request(app).get("/api/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("UP");
        expect(response.body.service).toBe("Jenkins CI/CD Demo");
    });

});