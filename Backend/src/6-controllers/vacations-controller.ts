import express, { Request, Response, NextFunction } from "express";
import vacationsService from "../5-services/vacations-service";
import verifyToken from "../4-middleware/verify-token";
import verifyAdmin from "../4-middleware/verify-admin";
import VacationsModel from "../3-models/vacations-model";
import StatusCode from "../3-models/status-code";

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

// POST new:
// Access: Admin only.
// http://localhost:4000/api/vacations
router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacation = new VacationsModel(request.body); // Create new class object.
        const newVacation = await vacationsService.addVacation(vacation); 
        response.status(StatusCode.Created).json(newVacation);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
