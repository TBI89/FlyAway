import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";
import app from "../src/app";
import { createReadStream } from "fs";
import path from "path";

describe("Testing the vacations-controller", () => {

    // GET - display all vacations:
    it("Should return all vacations", async () => {

        // Hard codded data for the authorization headers (Note to provide a valid token):
        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTEsImZpcnN0TmFtZSI6IkFkbWluIiwibGFzdE5hbWUiOiJUaGUgYm9zcyIsImVtYWlsIjoidG9tZXJfYmVuMzg0OTFAZ21haWwuY29tIiwicm9sZUlkIjoxfSwiaWF0IjoxNjkzNzU0NjExLCJleHAiOjE2OTM3NzI2MTF9.FWav7IZGZPnatUCSIAUfkfnkXcPPyJfkC_EIWdv-AvE";

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
        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTEsImZpcnN0TmFtZSI6IkFkbWluIiwibGFzdE5hbWUiOiJUaGUgYm9zcyIsImVtYWlsIjoidG9tZXJfYmVuMzg0OTFAZ21haWwuY29tIiwicm9sZUlkIjoxfSwiaWF0IjoxNjkzNzU0NjExLCJleHAiOjE2OTM3NzI2MTF9.FWav7IZGZPnatUCSIAUfkfnkXcPPyJfkC_EIWdv-AvE";

        // Hard codded data for a new vacation object:
        const vacation = {
            destination: "Paris",
            description: "The city of lights",
            startingDate: "2023-10-28",
            endingDate: "2023-11-28",
            price: 6500
        };

        // Mock image file path:
        const imageFilePath = path.resolve(__dirname, "../1-assets/images/mockImage.jpg");

        // Create the mock image file:
        const imageBuffer = createReadStream(imageFilePath);

        // Send the request to the backend:
        const response = await supertest(app.server)
            .post("/api/vacations")
            .set("Authorization", token)
            .field("destination", vacation.destination)
            .field("description", vacation.description)
            .field("startingDate", vacation.startingDate)
            .field("endingDate", vacation.endingDate)
            .field("price", vacation.price)
            .attach("image", imageBuffer, "mockImage.jpg");
            console.log('Response Headers:', response.headers);

        // Expect the object to have a body and id:
        const addedVacation = response.body;
        expect(addedVacation).to.haveOwnProperty("vacationId");
        expect(addedVacation).to.contain(vacation);
    });

});