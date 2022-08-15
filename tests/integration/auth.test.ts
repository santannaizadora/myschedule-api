import app from "../../src/app.js";
import supertest from 'supertest';
import { client } from "../../src/config/database.js";
import jwt from "jsonwebtoken";
import '../../src/setup.js';

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users CASCADE;`;
});

afterAll(async () => {
    await client.$disconnect();
});

const userBody = {
    name: "Teste",
    email: "teste@teste.com",
    password: "Teste*123"
}
const loginBody = {
    email: "teste@teste.com",
    password: "Teste*123"
}

describe("POST /auth/register", () => {
    it("given an valid user it should return 201", async () => {
        const result = await supertest(app).post("/auth/register").send(userBody);
        const status = result.status;
        expect(status).toEqual(201)
    })

    it("given an invalid user it should return 422", async () => {
        const body = {};
        const result = await supertest(app).post("/auth/register").send(body);
        const status = result.status;
        expect(status).toEqual(422)
    })

    it("given an user that already exists it should return 409", async () => {
        await supertest(app).post("/auth/register").send(userBody);
        const result = await supertest(app).post("/auth/register").send(userBody);
        const status = result.status;
        expect(status).toEqual(409)
    })
})

describe("POST /auth/login", () => {
    it("given an empty body it should return 422", async () => {
        const body = {};
        const result = await supertest(app).post("/auth/login").send(body);
        const status = result.status;
        expect(status).toEqual(422)
    })

    it("given an user that does not exist, it shuld return 403", async () => {
        const result = await supertest(app).post("/auth/login").send(loginBody);
        const status = result.status;
        expect(status).toEqual(403)
    })

    it("given an correct user, it shoud return an token and status 200", async () => {
        await supertest(app).post("/auth/register").send(userBody);
        const result = await supertest(app).post("/auth/login").send(loginBody);
        const status = result.status;

        const token = result.body.token;
        const decoded = jwt.verify(token, process.env.SECRET || "secret") as jwt.JwtPayload;
        expect(status).toEqual(200)
        expect(decoded.email).toEqual(userBody.email)
    })
})