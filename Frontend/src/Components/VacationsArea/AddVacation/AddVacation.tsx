import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationsModel from "../../../Models/VacationsModel";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import { Button, TextField, Typography, FormHelperText } from "@mui/material";
import { AddCircleOutline, TravelExplore, Description, FlightTakeoff, FlightLand, AttachMoney, Image } from "@mui/icons-material";

function AddVacation(): JSX.Element {

    // Manage form state:
    const { register, handleSubmit, formState: { errors } } = useForm<VacationsModel>();

    // Implement navigation (to redirect the admin after he adds a new vacation):
    const navigate = useNavigate();

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
                    className={errors.destination ? "errorInput" : ""} />
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
                    className={errors.description ? "errorInput" : ""} />
                {errors.description && (
                    <FormHelperText className="ErrorText">
                        {errors.description.message}
                    </FormHelperText>
                )}
                <br /><br />

                <FlightTakeoff className="AddVacationIcon" />
                <TextField
                    type="date"
                    {...register("startingDate", VacationsModel.startingDateValidation)}
                    error={Boolean(errors.startingDate)}
                    className={errors.startingDate ? "errorInput" : ""} />
                {errors.startingDate && (
                    <FormHelperText className="ErrorText">
                        {errors.startingDate.message}
                    </FormHelperText>
                )}
                <br /><br />

                <FlightLand className="AddVacationIcon" />
                <TextField
                    type="date"
                    {...register("endingDate", VacationsModel.endingDateValidation)}
                    error={Boolean(errors.endingDate)}
                    className={errors.endingDate ? "errorInput" : ""} />
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
                    className={errors.price ? "errorInput" : ""} />
                {errors.price && (
                    <FormHelperText className="ErrorText">
                        {errors.price.message}
                    </FormHelperText>
                )}
                <br /><br />

                <Image className="AddVacationIcon" />
                <TextField
                    type="file"
                    {...register("image", VacationsModel.imageValidation)}
                    error={Boolean(errors.image)}
                    className={errors.image ? "errorInput" : ""} />
                {errors.image && (
                    <FormHelperText className="ErrorText">
                        {errors.image.message}
                    </FormHelperText>
                )}
                <br /><br />

                <Button type="submit" className="AddButton">Add</Button>

            </form>

        </div>
    );
}

export default AddVacation;
