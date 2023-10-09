import express, { NextFunction, Request, Response } from "express";
import StatusCode from "../3-models/status-code";
import verifyToken from "../4-middleware/verify-token";
import followersService from "../5-services/followers-service";

const router = express.Router();

// POST new:
// Access: User only.
// http://localhost:4000/api/vacations/:userId/:vacationId/follow
router.post("/vacations/:userId/:vacationId/follow", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const vacationId = +request.params.vacationId;
        const followedVacation = await followersService.followVacation(userId, vacationId);
        response.status(StatusCode.Created).json({followedVacation});
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE existing:
// Access: User only.
// http://localhost:4000/api/vacations/:userId/:vacationId/unfollow
router.delete("/vacations/:userId/:vacationId/unfollow", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId; 
        const vacationId = +request.params.vacationId;
        await followersService.unFollowVacation(userId, vacationId);
        response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;