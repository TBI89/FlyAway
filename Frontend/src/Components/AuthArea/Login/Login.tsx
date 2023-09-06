import { useForm } from "react-hook-form";
import "./Login.css";
import CredentialsModel from "../../../Models/CredentialsModel";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import { TextField, Typography, FormHelperText, Button } from "@mui/material";
import { Input, Email, Password } from "@mui/icons-material"

function Login(): JSX.Element {

    // Init form with react-hook-form:
    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    // Send credentials to backend:
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

            <form onSubmit={handleSubmit(send)}>

                <Typography variant="h4" className="LoginHeader">
                    Login
                    <Input fontSize="small" />
                </Typography>
                <br />

                <Email className="LoginIcon" />
                <TextField label="Email" type="email"
                    {...register("email", CredentialsModel.emailValidation)} // Connect input to the related filed in the CredentialsModel.
                    error={Boolean(errors.email)} // Check for errors.
                    className={errors.email ? "errorInput" : ""} />
                {errors.email && ( // Display errors (if exists) with MUI & CSS styling.
                    <FormHelperText className="errorText">
                        {errors.email.message}
                    </FormHelperText>
                )}
                <br /><br />

                <Password className="LoginIcon" />
                <TextField label="Password" type="password"
                    {...register("password", CredentialsModel.passwordValidation)} // Connect input to the related filed in the CredentialsModel.
                    error={Boolean(errors.password)} // Check for errors.
                    className={errors.password ? "errorInput" : ""} />
                {errors.password && ( // Display errors (if exists) with MUI & CSS styling.
                    <FormHelperText className="errorText">
                        {errors.password.message}
                    </FormHelperText>
                )}

                <Button type="submit" className="LoginButton">Login</Button>

            </form>

        </div>
    );
}

export default Login;
