import { OkPacket } from "mysql";
import appConfig from "../2-utils/app-config";
import dal from "../2-utils/dal";
import imageHandler from "../2-utils/image-handler";
import { ResourceNotFoundError, ValidationError } from "../3-models/client-errors";
import VacationsModel from "../3-models/vacations-model";

// Get all vacations (and number of users who follow each vacation):
async function getAllVacations(): Promise<VacationsModel[]> {
    const sql = `
    SELECT
    vacationId,
    destination,
    description,
    startingDate,
    endingDate,
    price,
    CONCAT('${appConfig.domainName}/api/vacations/', imageName) AS imageUrl,
    (SELECT COUNT(*) FROM followers f WHERE f.vacationId = vacationId) AS followersCount
 FROM vacations 
 GROUP BY vacationId, startingDate, destination, description, endingDate, price, imageName;
 `;

    const vacations = await dal.execute(sql);
    return vacations;
}

// Get one vacation: 
async function getOneVacation(vacationId: number): Promise<VacationsModel> {
    const sql = `SELECT 
                    vacationId,
                    destination,
                    description,
                    startingDate,
                    endingDate,
                    price,
                    CONCAT('${appConfig.domainName}/api/vacations/', ImageName) AS imageUrl
                FROM vacations
                WHERE vacationId = ?`;
    const vacations = await dal.execute(sql, [vacationId]);
    const vacation = vacations[0];
    if (!vacation) throw new ResourceNotFoundError(vacationId);
    return vacation;
}

// Get old image:
async function getOldImage(vacationId: number): Promise<string> {
    const sql = `SELECT imageName from vacations WHERE vacationId = ?`;
    const vacations = await dal.execute(sql, [vacationId]);
    const vacation = vacations[0];
    if (!vacation) return null;
    const imageName = vacation.imageName;
    return imageName;
}

// Add vacation:
async function addVacation(newVacation: VacationsModel): Promise<VacationsModel> {

    // Check validity for all model properties:
    newVacation.validate();

    // Image is required only when adding a new vacation:
    if (!newVacation.image) throw new ValidationError("Please add an image.");

    // Date can't be on the past when adding a new vacation:
    const currentDate = new Date();
    const startingDate = new Date(newVacation.startingDate);
    const endingDate = new Date(newVacation.endingDate);

    if (startingDate <= currentDate || endingDate <= currentDate) {
        throw new ValidationError("Please choose a date in the future for both starting and ending dates.");
    }

    const imageName = await imageHandler.saveImage(newVacation.image);
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`; // Defend sql injection.
    const info: OkPacket = await dal.execute(sql,
        [newVacation.destination, newVacation.description, newVacation.startingDate, newVacation.endingDate,
        newVacation.price, imageName]);
    newVacation.vacationId = info.insertId; // Generate unique id.

    newVacation.imageName = `${appConfig.domainName}/api/vacations/${imageName}`; // Create reference for the image file.
    delete newVacation.image; // Remove the image object from the new vacation.
    return newVacation;
}

// Update vacation:
async function updateVacation(vacation: VacationsModel): Promise<VacationsModel> {
    vacation.validate(); // Validate updated properties.

    // Query & Image name are depended if the admin will upload an image or not:
    let sql = "";
    let imageName = "";

    // Check for an image:
    if (vacation.image) {
        const oldImage = await getOldImage(vacation.vacationId);
        imageName = await imageHandler.updateImage(vacation.image, oldImage); // Create new image name for the uploaded one.
        sql = `UPDATE vacations SET
        destination = '${vacation.destination}',
        description = '${vacation.description}',
        startingDate = '${vacation.startingDate}',
        endingDate = '${vacation.endingDate}',
        price = ${vacation.price}, 
        imageName = '${imageName}'
        WHERE vacationId = ${vacation.vacationId}`;
        console.log("SQL - with image: ", sql);

    }
    else {
        sql = `UPDATE vacations SET
        destination = '${vacation.destination}',
        description = '${vacation.description}',
        startingDate = '${vacation.startingDate}',
        endingDate = '${vacation.endingDate}',
        price = ${vacation.price}
        WHERE vacationId = ${vacation.vacationId}`;
        console.log("SQL - without image: ", sql);
    }

    const info: OkPacket = await dal.execute(sql);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    vacation.imageName = `${appConfig.domainName}/api/vacations/${imageName}`; // Create image url.
    delete vacation.image; // Remove the image from the vacation object.
    return vacation;
}

// Delete vacation:
async function deleteVacation(vacationId: number): Promise<void> {
    const oldImage = await getOldImage(vacationId); // Take current image.
    await imageHandler.deleteImage(oldImage); // Remove it from database.
    const sql = `DELETE from vacations WHERE vacationId = ?`;
    const info: OkPacket = await dal.execute(sql, [vacationId]);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacationId);
}

export default {
    getAllVacations,
    getOneVacation,
    getOldImage,
    addVacation,
    updateVacation,
    deleteVacation
};