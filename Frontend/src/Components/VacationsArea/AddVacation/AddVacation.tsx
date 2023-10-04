import { AddCircleOutline, AttachMoney, Description, FlightLand, FlightTakeoff, TravelExplore } from "@mui/icons-material";
import { Button, FormHelperText, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import imageSource from "../../../Assets/Images/no-image-added.png";
import VacationsModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./AddVacation.css";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";

function AddVacation(): JSX.Element {

    // Manage form state & image state:
    const { register, handleSubmit, formState: { errors } } = useForm<VacationsModel>();
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);

    // Implement navigation (to redirect the admin after he adds a new vacation):
    const navigate = useNavigate();

    // Check the user's role:
    useEffect(() => {

        // Check if there's a logged in user:
        const token = authStore.getState().token;
        if (!token) {
            notifyService.error("Please login first.");
            navigate("/login"); // If not, inform + redirect to login page.
            return;
        }

        const role = authStore.getState().user.roleId; // Get the user's role.
        if (role === 2) { // if he isn't an admin, notify him + navigate home.
            notifyService.error("You don't have assess to that page.");
            navigate("/home");
        }
        // else: allow assess.

    }, []);

    // When the admin uploads a new image, display it's preview (instead of the current one):
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newImage = event.target.files;
        if (newImage && newImage[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(newImage[0]); // Store the uploaded image file
            };
            reader.readAsDataURL(newImage[0]); // Read the uploaded image as data URL
        }
    };

    // Execute the vacation adding when the form is submitted:
    async function send(vacation: VacationsModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0]; // Convent to type File.
            await vacationsService.addVacation(vacation);
            notifyService.success("New vacation was added.");
            navigate("/vacations-admin");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddVacation">

            {/* Navigate back to the vacations page: */}
            <NavLink className="LinkToVacationsAdmin" to={'/vacations-admin'}>Back to Vacations</NavLink>

            <form onSubmit={handleSubmit(send)}>

                <Typography variant="h4" className="AddVacationHeader">
                    Add Vacation
                    <AddCircleOutline fontSize="small" />
                </Typography>
                <br />

                <TravelExplore className="AddVacationIcon" />
                <TextField
                    label="Destination" type="text"
                    {...register("destination", VacationsModel.destinationValidation)} // Prop Validation.
                    error={Boolean(errors.destination)} // Check for errors & display if exists.
                    className={errors.destination ? "errorInput" : ""}
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            shrink: "NoShrinkLabel"
                        }
                    }} />
                {errors.destination && (
                    <FormHelperText className="ErrorText">
                        {errors.destination.message}
                    </FormHelperText>
                )}
                <br /><br />

                <Description className="AddVacationIcon" />
                <TextField
                    label="Description" type="text"
                    {...register("description", VacationsModel.descriptionValidation)}
                    error={Boolean(errors.description)}
                    className={errors.description ? "errorInput" : ""}
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            shrink: "NoShrinkLabel"
                        }
                    }} />
                {errors.description && (
                    <FormHelperText className="ErrorText">
                        {errors.description.message}
                    </FormHelperText>
                )}
                <br /><br />

                <FlightTakeoff className="AddVacationIcon" />
                <TextField
                    label="Starting Date" type="date"
                    {...register("startingDate", VacationsModel.startingDateValidation)}
                    error={Boolean(errors.startingDate)}
                    className={errors.startingDate ? "errorInput" : ""}
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            shrink: "NoShrinkLabel"
                        }
                    }} />
                {errors.startingDate && (
                    <FormHelperText className="ErrorText">
                        {errors.startingDate.message}
                    </FormHelperText>
                )}
                <br /><br />

                <FlightLand className="AddVacationIcon" />
                <TextField
                    label="Ending Date" type="date"
                    {...register("endingDate", VacationsModel.endingDateValidation)}
                    error={Boolean(errors.endingDate)}
                    className={errors.endingDate ? "errorInput" : ""}
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            shrink: "NoShrinkLabel"
                        }
                    }} />
                {errors.endingDate && (
                    <FormHelperText className="ErrorText">
                        {errors.endingDate.message}
                    </FormHelperText>
                )}
                <br /><br />

                <AttachMoney className="AddVacationIcon" />
                <TextField
                    label="Price" type="number"
                    {...register("price", VacationsModel.priceValidation)}
                    error={Boolean(errors.price)}
                    className={errors.price ? "errorInput" : ""}
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            shrink: "NoShrinkLabel"
                        }
                    }} />
                {errors.price && (
                    <FormHelperText className="ErrorText">
                        {errors.price.message}
                    </FormHelperText>
                )}
                <br /><br />

                <TextField
                    label="Image" type="file"
                    {...register("image", VacationsModel.imageValidation)}
                    onChange={handleImageChange}
                    error={Boolean(errors.image)}
                    className={errors.image ? "errorInput" : ""}
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            shrink: "NoShrinkLabel"
                        }
                    }} />
                {errors.image && (
                    <FormHelperText className="ErrorText">
                        {errors.image.message}
                    </FormHelperText>
                )}
                <br /><br />

                <img src={uploadedImage ? URL.createObjectURL(uploadedImage) : imageSource} className="UploadedImage" />

                <br /> <br />

                <Button type="submit" className="AddButton">Add</Button>

            </form>

        </div>
    );
}

export default AddVacation;
