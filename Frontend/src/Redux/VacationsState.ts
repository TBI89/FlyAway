import { createStore } from "redux";
import VacationsModel from "../Models/VacationsModel";

// 1. Global state:
export class VacationsState {
    public vacations: VacationsModel[] = [];
}

// 2. Action type:
export enum VacationsActionType {
    SetVacation = "SetVacation",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation"
}

// 3. Action object:
export interface VacationsActionObject {
    type: VacationsActionType;
    payload?: any;
}

// 4. Reducer:
export function vacationsReducer(currentState = new VacationsState(), action: VacationsActionObject): VacationsState {

    // Create the new state based on the duplicated current global state:
    const newState = { ...currentState };

    // Change the state according to action:
    switch (action.type) {

        case VacationsActionType.SetVacation: // payload = vacations arr (save to global state).
            newState.vacations = action.payload;
            break;
        case VacationsActionType.AddVacation: // payload = added vacation (add to global state).
            newState.vacations.push(action.payload);
            break;
        case VacationsActionType.UpdateVacation: // payload = vacation.id to update.
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            if (indexToUpdate >= 0) newState.vacations[indexToUpdate] = action.payload;
            break;
        case VacationsActionType.DeleteVacation: // payload = vacation.id to delete.
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId = action.payload);
            if (indexToDelete >= 0) newState.vacations.splice(indexToDelete, 1);
            break;
    }

    return newState;
}

// 5. Store:
export const vacationsStore = createStore(vacationsReducer);
