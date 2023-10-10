import axios from "axios";
import VacationsModel from "../Models/VacationsModel";
import { VacationsActionObject, VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class VacationsService {

    public async getAllVacations(userId: number): Promise<VacationsModel[]> { 
       const response = await axios.get(appConfig.vacationsUrl + userId);
       const vacations = response.data;
       return vacations;
    }

    // Get one vacation:
    public async getOneVacation(vacationId: number): Promise<VacationsModel> {

        // Get global state:
        let vacations = vacationsStore.getState().vacations;

        // Find the vacation:
        let vacation = vacations.find(v => v.vacationId === vacationId);

        // Check if the vacation exists: 
        if (!vacation) {
            const response = await axios.get<VacationsModel>(appConfig.singleVacationUrl + vacationId);
            vacation = response.data;
        }

        return vacation;
    }

    // Add new vacation to database:
    public async addVacation(vacation: VacationsModel): Promise<void> {

        // Additional data - include the image file in the request
        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        }

        // Send the vacation object to the server:
        const response = await axios.post<VacationsModel>(appConfig.vacationsUrl, vacation, options);

        // Extract the new vacation:
        const addedVacation = response.data;

        // Add to global state:
        const action: VacationsActionObject = { type: VacationsActionType.AddVacation, payload: addedVacation };
        vacationsStore.dispatch(action);
    }

    // Edit existing vacation:
    public async updateVacation(vacation: VacationsModel): Promise<void> {

        // Additional data - include the image file in the request
        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        }

        // Extract vacationId:
        const vacationId = vacation.vacationId;

        // Send the vacation object to the server:
        const response = await axios.put<VacationsModel>(appConfig.vacationsUrl + vacationId, vacation, options);

        // Extract the updated vacation:
        const updatedVacation = response.data;
        
        // Add to global state:
        const action: VacationsActionObject = { type: VacationsActionType.UpdateVacation, payload: updatedVacation };
        vacationsStore.dispatch(action);
    }

    // Delete existing vacation:
    public async deleteVacation(vacationId: number): Promise<void> {

        // Send request to the server with the vacationId to remove:
        await axios.delete(appConfig.vacationsUrl + vacationId);

        // Update global state:
        const action: VacationsActionObject = { type: VacationsActionType.DeleteVacation, payload: vacationId };
        vacationsStore.dispatch(action);
    }
}

const vacationsService = new VacationsService(); // Singleton.
export default vacationsService;