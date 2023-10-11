import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import app from "../src/app";

describe("Testing the auth controller", () => {

    // POST - register:
    it("Should add a new user to database", async () => {

        // Hard coded data for a new user:
        const user = {
            firstName: "Tomer",
            lastName: "Ben-Israel",
            email: "tomer_ben_israel@gmail.com", // Note to provide a valid & unique email.
            password: "1234",
            roleId: 2
        };

        // Send request:
        const response = await supertest(app.server)
            .post("/api/register")
            .send(user);

        // Expect 
        expect(response.status).equal(201); // = Created.

        // Provide a token for the new user:
        expect(Object.values(response.body).some(value => typeof value === 'string')).to.be.true;
    });

    // POST - login:
    it("Should verify user credentials and provide a token", async () => {

        // Hard coded data user credentials:
        const credentials = {
            email: "normal-user@gmail.com",
            password: "1234",
        };

        // Send request:
        const response = await supertest(app.server)
            .post("/api/login")
            .send(credentials);

        // Expect:
        expect(response.status).equal(200); // = OK.

        // Provide a token for the user:
        expect(Object.values(response.body).some(value => typeof value === 'string')).to.be.true;
    });

});