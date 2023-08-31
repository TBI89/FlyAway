import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import VacationsModel from "../3-models/vacations-model";
import { ResourceNotFoundError } from "../3-models/client-errors";
import appConfig from "../2-utils/app-config";
import imageHandler from "../2-utils/image-handler";
import { log } from "console";

// Get all vacations:
async function getAllVacations(): Promise<VacationsModel[]> {
    const sql = `SELECT * FROM vacations`;
    const vacations = await dal.execute(sql);
    return vacations;
}

// Add vacation:
async function addVacation(newVacation: VacationsModel): Promise<VacationsModel> { 
    newVacation.validate(); // Check validity for all model properties.   
    const imageName = await imageHandler.saveImage(newVacation.image);
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`; // Defend sql injection.
    const info: OkPacket = await dal.execute(sql,
        [newVacation.destination, newVacation.description, newVacation.startingDate, newVacation.endingDate,
        newVacation.price, imageName]);
    newVacation.vacationId = info.insertId; // Generate unique id.
    newVacation.imageName = `${appConfig.domainName}/api/vacations/${imageName}`; // Generate uuid for the new image.
    delete newVacation.image; // Remove the image object from the new vacation.
    return newVacation;
}

// Update vacation:
async function updateVacation(vacation: VacationsModel): Promise<VacationsModel> {
    vacation.validate(); // Validate updated properties.
    const sql = `UPDATE vacations SET
   destination = '${vacation.destination}',
   description = '${vacation.description}',
   startingDate = '${vacation.startingDate}',
   endingDate = '${vacation.endingDate}',
   price = ${vacation.price}, 
   imageName = '${vacation.imageName}'
   WHERE vacationId = ${vacation.vacationId}`;
    const info: OkPacket = await dal.execute(sql);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);
    return vacation;
}

// Delete vacation:
async function deleteVacation(vacationId: number): Promise<void> {
    const sql = `DELETE from vacations WHERE vacationId = ${vacationId}`;
    const info: OkPacket = await dal.execute(sql);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacationId);
}

export default {
    getAllVacations,
    addVacation,
    updateVacation,
    deleteVacation
};

