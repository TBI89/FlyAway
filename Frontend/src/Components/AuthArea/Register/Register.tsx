import { useForm } from "react-hook-form";
import "./Register.css";
import UsersModel from "../../../Models/UsersModel";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UsersModel>();
    const navigate = useNavigate();

    async function send(user: UsersModel) {
        try {
            await authService.register(user);
            notifyService.success("Welcome to Fly Away!");
            navigate("/vacation-list");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">

            <h2>Register</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>First Name</label>
                <input type="text"/>

                <label>Last Name</label>
                <input type="text"/>

                <label>Email</label>
                <input type="text"/>

                <label>Password</label>
                <input type="text"/>

                <button>Register</button>

            </form>

        </div>
    );
}

export default Register;
