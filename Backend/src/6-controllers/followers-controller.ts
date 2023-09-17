import express, { Request, Response, NextFunction } from "express";
import verifyToken from "../4-middleware/verify-token";
import followersService from "../5-services/followers-service";
import StatusCode from "../3-models/status-code";

const router = express.Router();

// POST new:
// Access: User only.
// http://localhost:4000/api/vacations/:userId/:vacationId/follow
router.post("/vacations/:userId/:vacationId/follow", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const vacationId = +request.params.vacationId;
        const followedVacation = await followersService.followVacation(userId, vacationId);
        response.sendStatus(StatusCode.Created).json(followedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;