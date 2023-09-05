import axios from "axios";
import UsersModel from "../Models/UsersModel";
import appConfig from "../Utils/AppConfig";
import { AuthActionObject, AuthActionType, authStore } from "../Redux/AuthState";
import CredentialsModel from "../Models/CredentialsModel";

class AuthService {

    // Register:
    public async register(user: UsersModel): Promise<void> {

        // Send user to backend:           token
        const response = await axios.post<string>(appConfig.registerUrl, user);
        
        // Extract JWT:
        const token = response.data;

        // Send token to global state:
        const action: AuthActionObject = { type: AuthActionType.Register, payload: token };
        authStore.dispatch(action);
    }

    // Login:
    public async login(credentials: CredentialsModel): Promise<void> {

        // Send credentials to backend:
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Extract JWT:
        const token = response.data;

        // Send token to global state:
        const action: AuthActionObject = { type: AuthActionType.Login, payload: token };
        authStore.dispatch(action);
    }

    // Logout:
    public logout(): void {
        const action: AuthActionObject = { type: AuthActionType.Logout };
        authStore.dispatch(action);
    }
}

const authService = new AuthService();

export default authService;