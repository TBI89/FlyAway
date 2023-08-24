import { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";

function verifyAdmin(request: Request, response: Response, next: NextFunction): void {
    const authorizationHeader = request.header("authorization"); // "Bearer the-token".
    const token = authorizationHeader?.substring(7); // Extract token (from header to token: 7 chars).
    cyber.verifyAdmin(token); // Verify token.
    next();
}

export default verifyAdmin;