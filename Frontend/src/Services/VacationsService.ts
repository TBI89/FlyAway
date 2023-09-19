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
}

const vacationsService = new VacationsService(); // Singleton.
export default vacationsService;