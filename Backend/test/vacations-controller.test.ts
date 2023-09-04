import { expect } from "chai";
import fs from "fs";
import { describe, it } from "mocha";
import * as os from "os";
import path from "path";
import supertest from "supertest";
import app from "../src/app";

describe("Testing the vacations-controller", () => {

    // GET - display all vacations:
    it("Should return all vacations", async () => {

        // Hard codded data for the authorization headers (Note to provide a valid token):
        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTEsImZpcnN0TmFtZSI6IkFkbWluIiwibGFzdE5hbWUiOiJUaGUgYm9zcyIsImVtYWlsIjoidG9tZXJfYmVuMzg0OTFAZ21haWwuY29tIiwicm9sZUlkIjoxfSwiaWF0IjoxNjkzODIxNzE2LCJleHAiOjE2OTM4Mzk3MTZ9.DNgTvrAG6wm7ObVHejIWfjRH5P1bX50EK36WYE9sqI0";

        // Send the request & the auth headers to the backend:
        const response = await supertest(app.server)
            .get("/api/vacations")
            .set("Authorization", token);

        // Expect for an OK response & an array of objects:
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length).to.be.greaterThan(0);
    });

    // POST - add new vacation:
    it("Should add a new vacation and return it", async () => {

        // Hard codded data for the authorization headers (Note to provide a valid token):
        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTEsImZpcnN0TmFtZSI6IkFkbWluIiwibGFzdE5hbWUiOiJUaGUgYm9zcyIsImVtYWlsIjoidG9tZXJfYmVuMzg0OTFAZ21haWwuY29tIiwicm9sZUlkIjoxfSwiaWF0IjoxNjkzODIxNzE2LCJleHAiOjE2OTM4Mzk3MTZ9.DNgTvrAG6wm7ObVHejIWfjRH5P1bX50EK36WYE9sqI0";

        // Hard codded data for a new vacation object:
        const vacation = {
            destination: "Paris",
            description: "The city of lights",
            startingDate: "2023-10-28",
            endingDate: "2023-11-28",
            price: 6500
        };

        // Buffer with dummy image data:
        const imageBuffer = Buffer.from("image-data.jpg");

        // Path to save the mock image:
        const mockImagePath = path.resolve(__dirname, "../src/1-assets/images/mockImage.jpg");

        // Create the mock file:
        fs.writeFileSync(mockImagePath, imageBuffer);

        // Send the request to the backend:
        const response = await supertest(app.server)
            .post("/api/vacations")
            .set("Authorization", token)
            .field("destination", vacation.destination)
            .field("description", vacation.description)
            .field("startingDate", vacation.startingDate)
            .field("endingDate", vacation.endingDate)
            .field("price", vacation.price)
            .attach("image", mockImagePath);

        // Expect the object to have a body and id:
        const addedVacation = response.body;
        expect(addedVacation).to.haveOwnProperty("vacationId");

        // Verify that the parsed price from the response matches the expected price in the test data:
        expect(parseFloat(addedVacation.price)).to.equal(vacation.price);
    });

    // PUT - update existing vacation:
    it("Should update an existing vacation", async () => {

        // Hard coded data for authorization headers: (note to provide a valid token)
        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTEsImZpcnN0TmFtZSI6IkFkbWluIiwibGFzdE5hbWUiOiJUaGUgYm9zcyIsImVtYWlsIjoidG9tZXJfYmVuMzg0OTFAZ21haWwuY29tIiwicm9sZUlkIjoxfSwiaWF0IjoxNjkzODIxNzE2LCJleHAiOjE2OTM4Mzk3MTZ9.DNgTvrAG6wm7ObVHejIWfjRH5P1bX50EK36WYE9sqI0";

        // Hard coded data for an updated vacation:
        const updatedVacation = {
            destination: "London",
            description: "The city of Harry Potter",
            startingDate: "2024-01-01",
            endingDate: "2024-01-10",
            price: 9500
        };

        // Buffer for dummy image data:
        const imageBuffer = Buffer.from("updated-image-data.jpg");

        // Create a temporary file to store the image:
        const tempImagePath = path.join(os.tmpdir(), "updatedMockImage.jpg");
        fs.writeFileSync(tempImagePath, imageBuffer);

        // Send request to update vacation:
        const response = await supertest(app.server)
            .put("/api/vacations/30") // Note to provide a valid id.
            .set("Authorization", token)
            .field("destination", updatedVacation.destination)
            .field("description", updatedVacation.description)
            .field("startingDate", updatedVacation.startingDate)
            .field("endingDate", updatedVacation.endingDate)
            .field("price", updatedVacation.price)
            .attach("image", tempImagePath); // Attach the temporary file.

        // Expect the object to have a body & id:
        const updatedVacationResponse = response.body;
        expect(updatedVacationResponse).to.haveOwnProperty("vacationId");

        // Verify that the parsed price from the response matches the updated price from the test data:
        expect(parseFloat(updatedVacationResponse.price)).to.equal(updatedVacation.price);

        // Clean up: Remove the temporary file
        fs.unlinkSync(tempImagePath);
    });

    // DELETE - existing vacation:
    it("Should delete an existing vacation", async () => {

        // Hard coded data for the authorization headers (note to provide a valid token)
        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTEsImZpcnN0TmFtZSI6IkFkbWluIiwibGFzdE5hbWUiOiJUaGUgYm9zcyIsImVtYWlsIjoidG9tZXJfYmVuMzg0OTFAZ21haWwuY29tIiwicm9sZUlkIjoxfSwiaWF0IjoxNjkzODIxNzE2LCJleHAiOjE2OTM4Mzk3MTZ9.DNgTvrAG6wm7ObVHejIWfjRH5P1bX50EK36WYE9sqI0";

        // Send DELETE request:
        const response = await supertest(app.server)
            .delete("/api/vacations/30") // Note to provide a valid id.
            .set("Authorization", token)

        // Expect 204 (No content):
        expect(response.status).to.equal(204);

    });

});