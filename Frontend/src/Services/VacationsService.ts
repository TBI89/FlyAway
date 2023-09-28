import axios from "axios";
import VacationsModel from "../Models/VacationsModel";
import { VacationsActionObject, VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class VacationsService {

    // Get all vacations:
    public async getAllVacations(): Promise<VacationsModel[]> {

        // Get global state:
        let vacations = vacationsStore.getState().vacations;

        // Check if vacations exist already:
        if (vacations.length === 0) { // If not create GET request to display them.
            const response = await axios.get<VacationsModel[]>(appConfig.vacationsUrl);
            vacations = response.data;
            const action: VacationsActionObject = { type: VacationsActionType.SetVacation, payload: vacations };
            vacationsStore.dispatch(action); // Save vacations in global state.
        }

        return vacations;
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
}

const vacationsService = new VacationsService(); // Singleton.
export default vacationsService;