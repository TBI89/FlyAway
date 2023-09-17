import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError, ValidationError } from "../3-models/client-errors";

// Follow vacation:
async function followVacation(userId: number, vacationId: number): Promise<{ userId: number, vacationId: number }> {

    // Check if the user exists:
    const userExistsQuery = 'SELECT COUNT(*) as count FROM users WHERE userId = ?';
    const userExistsResult = await dal.execute(userExistsQuery, [userId]);

    if (userExistsResult[0].count === 0) {
        throw new ResourceNotFoundError(userId);
    }

    // Check if the vacation exists:
    const vacationExistsQuery = 'SELECT COUNT(*) as count FROM vacations WHERE vacationId = ?';
    const vacationExistsResult = await dal.execute(vacationExistsQuery, [vacationId]);

    if (vacationExistsResult[0].count === 0) {
        throw new ResourceNotFoundError(vacationId);
    }

    // Insert into followers:
    const sql = `
    INSERT INTO followers (userId, vacationId)
    SELECT ?, ?
    WHERE NOT EXISTS (
        SELECT 1 FROM followers
        WHERE userId = ? AND vacationId = ?
    )`;

    const followedVacation: OkPacket = await dal.execute(sql, [userId, vacationId, userId, vacationId]);

    // Check if the user try's to follow the same vacation twice:
    if (followedVacation.affectedRows === 0) {
        throw new ValidationError("You can't follow the same vacation twice.");
    }

    return { userId, vacationId };
}

// Un follow vacation:
async function unFollowVacation(userId: number, vacationId: number): Promise<void> {

    // Check if the user, vacation, and relationship exist:
    const existenceQuery = `
        SELECT
            (SELECT COUNT(*) FROM users WHERE userId = ?) AS userExists,
            (SELECT COUNT(*) FROM vacations WHERE vacationId = ?) AS vacationExists,
            (SELECT COUNT(*) FROM followers WHERE userId = ? AND vacationId = ?) AS relationshipExists
    `;

    const existenceResult = await dal.execute(existenceQuery, [userId, vacationId, userId, vacationId]);

    if (existenceResult[0].userExists === 0) {
        throw new ResourceNotFoundError(userId);
    }

    if (existenceResult[0].vacationExists === 0) {
        throw new ResourceNotFoundError(vacationId);
    }

    if (existenceResult[0].relationshipExists === 0) {
        throw new ValidationError("You're not following that vacation.");
    }

    // Unfollow the vacation:
    const deleteQuery = 'DELETE FROM followers WHERE userId = ? AND vacationId = ?';
    await dal.execute(deleteQuery, [userId, vacationId]);
}


export default {
    followVacation,
    unFollowVacation
};