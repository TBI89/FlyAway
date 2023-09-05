import { useForm } from "react-hook-form";
import "./Login.css";
import CredentialsModel from "../../../Models/CredentialsModel";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("You are logged in!");
            navigate("/vacation-list");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }
    return (
        <div className="Login">

            <h2>Login</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Email</label>
                <input type="email" {...register("email")}/>

                <label>Password</label>
                <input type="text" {...register("password")}/>

                <button>Login</button>

            </form>

        </div>
    );
}

export default Login;
