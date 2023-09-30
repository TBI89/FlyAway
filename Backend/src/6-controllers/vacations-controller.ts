import express, { Request, Response, NextFunction } from "express";
import vacationsService from "../5-services/vacations-service";
import verifyToken from "../4-middleware/verify-token";
import verifyAdmin from "../4-middleware/verify-admin";
import VacationsModel from "../3-models/vacations-model";
import StatusCode from "../3-models/status-code";
import path from "path";

const router = express.Router();

// GET all:
// Access: Logged in users (and admin) only.
// http://localhost:4000/api/vacations
router.get("/vacations", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsService.getAllVacations();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// GET one:
// Access: Admin only (when editing vacation).
// http://localhost:4000/api/vacations/:vacationId
router.get("/vacations/:vacationId([0-9]+)", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsService.getAllVacations();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// GET old image:
// Access: Logged in users (and admin) only.
// http://localhost:4000/api/vacations/:imageName
router.get("/vacations/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

// POST new:
// Access: Admin only.
// http://localhost:4000/api/vacations
router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image // Add image if a file was uploaded.
        const vacation = new VacationsModel(request.body); // Create new class object.
        const newVacation = await vacationsService.addVacation(vacation);
        response.status(StatusCode.Created).json(newVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT existing:
// Access: Admin only.
// http://localhost:4000/api/vacations/:vacationId
router.put("/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.vacationId; // Extract route id into the body.
        request.body.image = request.files?.image // Add image if a file was uploaded.
        const vacation = new VacationsModel(request.body); // Get vacation sent from the frontend.
        const updatedVacation = await vacationsService.updateVacation(vacation); // Update the vacation.
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE existing:
// Access: Admin only.
// http://localhost:4000/api/vacations/:vacationId
router.delete("/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.vacationId; // Extract route id into the body.
        await vacationsService.deleteVacation(id); // Update the vacation.
        response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
