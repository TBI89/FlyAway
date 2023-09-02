import JWT from "jsonwebtoken";
import { ForbiddenError, UnauthorizedError } from "../3-models/client-errors";
import UsersModel from "../3-models/users-model";
import RolesModel from "../3-models/roles-model";
import crypto from "crypto";

const tokenSecretKey = "WeAllNeedVacationsSomeTimes!";

// On register / login generate the user a unique token:
function getNewToken(user: UsersModel): string {
    delete user.password; // Remove first the password (won't be visible when extracting the user props from the token).
    const container = { user };
    const options = { expiresIn: "5h" };
    const token = JWT.sign(container, tokenSecretKey, options); // Generate token.
    return token;
}

// Check if the token exist / didn't expired:
function validateToken(token: string): void {
    if (!token) throw new UnauthorizedError("No legal token was found");
    try {
        JWT.verify(token, tokenSecretKey);
    }
    catch (err: any) {
        throw new UnauthorizedError(err.message)
    }
}

// Check the user role:
function verifyAdmin(token: string): void {
    validateToken(token); // We need to validate the token first.
    const container = JWT.verify(token, tokenSecretKey);
    const user: UsersModel = (container as any).user;
    if (user.roleId !== RolesModel.Admin) throw new ForbiddenError("You are not an admin"); // If the user isn't an admin - throw 403.
}

const hashSalt = "BestVacationWebsiteEver";

// Add to user password additional chars to make them unvisitable to programmer on the backend:
function hashPassword(plainText: string): string {
    if (!plainText) return null;
    const saltedHashedPassword = crypto.createHmac("sha512", hashSalt).update(plainText).digest("hex");
    return saltedHashedPassword;
}

export default {
    getNewToken,
    validateToken,
    verifyAdmin,
    hashPassword
};