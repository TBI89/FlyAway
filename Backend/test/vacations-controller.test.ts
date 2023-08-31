import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";
import app from "../src/app";

describe("Testing the vacations-controller", () => {

    it("Should return all vacations", async () => {
        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6NSwiZmlyc3ROYW1lIjoiUGF2ZWwiLCJsYXN0TmFtZSI6IlJpdm5pIiwiZW1haWwiOiJwYXZlbC1yaXZuaUBnYW1pbC5jb20iLCJyb2xlSWQiOjJ9LCJpYXQiOjE2OTMzMDEwNzAsImV4cCI6MTY5MzMxOTA3MH0.0Ayq31GYftN5HDhKDvN_6QcD2MLetSQseBeVrCp_G9s";

        const response = await supertest(app.server)
            .get("api/vacations")
            .set("Authorization", token);
            
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length).to.be.greaterThan(0);
    });
    
});