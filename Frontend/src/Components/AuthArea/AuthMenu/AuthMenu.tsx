import { useEffect, useState } from "react";
import "./AuthMenu.css";
import UsersModel from "../../../Models/UsersModel";
import authService from "../../../Services/AuthService";
import { authStore } from "../../../Redux/AuthState";
import { NavLink } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";

function AuthMenu(): JSX.Element {

    // Create local state and hold user data:
    const [user, setUser] = useState<UsersModel>();

    // Run once when the component mounts:
    useEffect(() => {
        setUser(authStore.getState().user); // Init user state.
        const unsubscribe = authStore.subscribe(() => setUser(authStore.getState().user)); // Subscribe for changes with Redux.
        return unsubscribe; // Stop following changes when the component destroyed.
    }, []);

    // Handle logout:
    function logoutUser() {
        authService.logout();
        notifyService.success("Goodbye!");
    }

    return (
        <div className="AuthMenu">

            {/* Logged out screen: */}
            {!user &&
                <div>
                    <span>Hello Guest</span>
                    <span> | </span>
                    <NavLink to="/register">Register</NavLink>
                    <span> | </span>
                    <NavLink to="/login">Login</NavLink>
                </div>}

            {/* Logged in screen: */}
            {user &&
                <div>
                    <span>Hello {user.firstName} {user.lastName} |</span>
                    <NavLink to="/home" onClick={logoutUser}>Logout</NavLink>
                </div>}

        </div>
    );
}

export default AuthMenu;
