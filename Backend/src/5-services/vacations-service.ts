import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import VacationsModel from "../3-models/vacations-model";

// Get all vacations:
async function getAllVacations(): Promise<VacationsModel[]> {
    const sql = `SELECT * FROM vacations`;
    const vacations = await dal.execute(sql);
    return vacations;
}

// Add vacation:
async function addVacation(newVacation: VacationsModel): Promise<VacationsModel> {
    newVacation.validate(); // Check validity for all model properties.
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`; // Defend sql injection.
    const info: OkPacket = await dal.execute(sql,
        [newVacation.destination, newVacation.description, newVacation.startingDate, newVacation.endingDate,
        newVacation.price, newVacation.imageName]);
    newVacation.vacationId = info.insertId; // Generate unique id.
    return newVacation;
}

export default {
    getAllVacations,
    addVacation
};

