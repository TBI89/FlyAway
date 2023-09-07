import axios from "axios";
import { authStore } from "../Redux/AuthState";

class Interceptors {

    public create(): void {

        // Registering to request interceptor:
        axios.interceptors.request.use(requestObject => { // Obj contains request data.

            if (authStore.getState().token) { //Check if the request obj has a token.
                // If true: add it to the requestObject:
                requestObject.headers.Authorization = "Bearer " + authStore.getState().token;
            }

            return requestObject;
        });
    }
}

const interceptors = new Interceptors(); // Singleton.
export default interceptors;