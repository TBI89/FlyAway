import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";
import app from "../src/app";

describe("Testing the followers-controller", () => {

    // Init authorization and params for the request (provide valid data):
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MzIsImZpcnN0TmFtZSI6IkFkbWluIiwibGFzdE5hbWUiOiJTcGVjaWFsIiwiZW1haWwiOiJzcGVjaWFsLWFkbWluQGdtYWlsLmNvbSIsInJvbGVJZCI6MX0sImlhdCI6MTY5NzAzODQ1OCwiZXhwIjoxNjk3MDU2NDU4fQ.LG2J-J-_0INq2vp5nKbYN3xjq8xUyUjjJhvBnjfnd3I";
    const userId = 37;
    const vacationId = 61;

    // Follow vacation:
    it("Should add a new follower (userId) to a vacationId", async () => {

        // Create request:
        const response = await supertest(app.server)
            .post(`/api/vacations/${userId}/${vacationId}/follow`) // Provide a valid userId & vacationId.
            .set("Authorization", token)
            .send();

        // Generate the response:
        expect(response.status).to.equal(201); // Created (new follower).
    });

    // Unfollow vacation:
    it("Should remove a follower (userId) from the vacationId", async () => {

        // Create request:
        const response = await supertest(app.server)
            .delete(`/api/vacations/${userId}/${vacationId}/unfollow`) // Provide a valid userId & vacationId.
            .set("Authorization", token)
            .send();

        // Generate the response:
        expect(response.status).to.equal(204); // No content (vacation unfollowed).

    });

});