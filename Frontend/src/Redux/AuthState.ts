import { createStore } from "redux";
import UsersModel from "../Models/UsersModel";
import jwtDecode from "jwt-decode";

// 1. Global state:
export class AuthState {

    // Init token & user props:
    public token: string = null;
    public user: UsersModel = null;

    public constructor() {
        this.token = sessionStorage.getItem("token"); // Retrieve token from s.storage.
        if (this.token) { // Decode the token (if exists).
            this.user = jwtDecode<{ user: UsersModel }>(this.token).user;
        }
    }
}

// 2. Action type:
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

// 3. Action object:
export interface AuthActionObject {
    type: AuthActionType;
    payload?: string;  // JWT.
}

// 4. Reducer:
export function authReducer(currentState = new AuthState(), action: AuthActionObject): AuthState {

    // Create a new state (clone the current one and add to it):
    const newState = { ...currentState };

    // Handle authentication actions:
    switch (action.type) {
        case AuthActionType.Register: // Payload = JWT.
        case AuthActionType.Login: // Payload = JWT.
            newState.token = action.payload;
            newState.user = jwtDecode<{ user: UsersModel }>(newState.token).user; // Update token & user info.
            sessionStorage.setItem("token", newState.token);
            break;
        case AuthActionType.Logout: // Clear token & user info on Logout.
            newState.token = null;
            newState.user = null;
            sessionStorage.removeItem("token");
            break;
    }

    return newState;
}

// 5. Store:
export const authStore = createStore(authReducer);