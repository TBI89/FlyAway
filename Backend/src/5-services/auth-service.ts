import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import RolesModel from "../3-models/roles-model";
import UsersModel from "../3-models/users-model";
import dal from "../2-utils/dal";
import CredentialsModel from "../3-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";

async function register(user: UsersModel): Promise<string> {
    user.validate(); // Validate user props.
    user.roleId = RolesModel.User; // Set role as "User" by default.
    if (await checkIfEmailTaken(user.email)) throw new ValidationError(`The email ${user.email} already exist \n Please provide a different one.`);
    user.password = cyber.hashPassword(user.password); // Hash user password.
    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`;
    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId]);
    user.userId = info.insertId; // Generate unique id.
    const token = cyber.getNewToken(user); // Provide the user the token.
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
    credentials.validate(); // Validate email & password.
    const hashedEnteredPassword = cyber.hashPassword(credentials.password); // Hash the entered password.
    console.log(hashedEnteredPassword);

    const sql = `SELECT * FROM users WHERE email = ?`;
    const users = await dal.execute(sql, [credentials.email]); // Execute sql query
    const user = users[0]; // extract our user.
    console.log(user);

    if (!user) {
        throw new UnauthorizedError("Email or password are wrong"); // If user doesn't exist or passwords don't match: throw 401.
    }
    const token = cyber.getNewToken(user); // Generate token for the user.
    return token;
}

async function checkIfEmailTaken(email: string): Promise<boolean> {
    const sql = `SELECT COUNT (*) AS count FROM users WHERE email = ?`; // Check on db users with the same email address.
    const result = await dal.execute(sql, [email]);
    const count = result[0].count;
    return count > 0;
}

export default {
    register,
    login
};