import { useForm } from "react-hook-form";
import "./Register.css";
import UsersModel from "../../../Models/UsersModel";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import { Button, TextField, Typography, FormHelperText } from "@mui/material";
import { AppRegistration, Email, Password, Person } from "@mui/icons-material";

function Register(): JSX.Element {

    // Init form with react-hook-form:
    const { register, handleSubmit, formState: { errors } } = useForm<UsersModel>();
    const navigate = useNavigate();

    // Send user to backend, update the user & redirect to vacations list component:
    async function send(user: UsersModel) {
        try {
            await authService.register(user);
            notifyService.success("Welcome to Fly Away!");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">

            <form onSubmit={handleSubmit(send)}>

                <Typography variant="h4" className="RegisterHeader">
                    Register
                    <AppRegistration fontSize="small" />
                </Typography>
                <br />

                <Person className="RegisterIcon" />
                <TextField
                    label="First Name" type="text"
                    {...register('firstName', UsersModel.firstNameValidation)} // Connect input to the related field in the UsersModel.
                    error={Boolean(errors.firstName)} // Check for errors
                    className={errors.firstName ? "errorInput" : ""} />
                {errors.firstName && ( // Display error (if exists) with MUI & CSS styling.
                    <FormHelperText className="ErrorText">
                        {errors.firstName.message}
                    </FormHelperText>
                )}
                <br /> <br />

                <Person className="RegisterIcon" />
                <TextField label="Last Name" type="text"
                    {...register("lastName", UsersModel.lastNameValidation)}
                    error={Boolean(errors.lastName)}
                    className={errors.lastName ? "errorInput" : ""} />
                {errors.lastName && (
                    <FormHelperText className="ErrorText">
                        {errors.lastName.message}
                    </FormHelperText>
                )}
                <br /> <br />

                <Email className="RegisterIcon" />
                <TextField label="Email" type="email"
                    {...register("email", UsersModel.emailValidation)}
                    error={Boolean(errors.email)}
                    className={errors.email ? "errorInput" : ""} />
                {errors.email && (
                    <FormHelperText className="ErrorText">
                        {errors.email.message}
                    </FormHelperText>
                )}
                <br /> <br />

                <Password className="RegisterIcon" />
                <TextField label="Password" type="password"
                    {...register("password", UsersModel.passwordValidation)}
                    error={Boolean(errors.password)}
                    className={errors.password ? "errorInput" : ""} />
                {errors.password && (
                    <FormHelperText className="ErrorText">
                        {errors.password.message}
                    </FormHelperText>
                )}
                <br /> <br />

                <Button type="submit" className="RegisterButton">Register</Button>

            </form>

        </div>
    );
}

export default Register;
