import axios from "axios";
import UsersModel from "../Models/UsersModel";
import appConfig from "../Utils/AppConfig";
import { AuthActionObject, AuthActionType, authStore } from "../Redux/AuthState";

class AuthService {

    // Register:
    public async register(user: UsersModel): Promise<void> {

        // Send to backend:               token
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Extract user:
        const token = response.data;

        // Send token to global state:
        const action: AuthActionObject = { type: AuthActionType.Register, payload: token };
        authStore.dispatch(action);
    }
}

const authService = new AuthService();

export default authService;