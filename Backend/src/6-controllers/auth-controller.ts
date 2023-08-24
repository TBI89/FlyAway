import express, { Request, Response, NextFunction } from "express"
import UsersModel from "../3-models/users-model";
import authService from "../5-services/auth-service";
import StatusCode from "../3-models/status-code";
import CredentialsModel from "../3-models/credentials-model";

// Create router from express:
const router = express.Router();

// POST (register):
// http://localhost:4000/api/register
router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UsersModel(request.body); // Create new class obj.
        const token = await authService.register(user); // Add user to db.
        response.status(StatusCode.Created).json(token); // Response with the token.
    }
    catch (err: any) {
        next(err);
    }
});

// POST (login - special case):
// http://localhost:4000/api/login
router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body); // Get credentials
        const token = await authService.login(credentials); // Login.
        response.json(token); // Response with the token.
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
