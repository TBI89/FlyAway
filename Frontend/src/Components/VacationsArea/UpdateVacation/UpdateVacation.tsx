import { AttachMoney, Description, FlightLand, FlightTakeoff, Image, TravelExplore } from "@mui/icons-material";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { Button, FormHelperText, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationsModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./UpdateVacation.css";

function UpdateVacation(): JSX.Element {

    // Manage form state:
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<VacationsModel>();

    // Implement navigation (to redirect the admin after he updates the vacation):
    const navigate = useNavigate();

    // Use the vacationId when updating a vacation:
    const params = useParams();
    const vacationId = +params.vacationId;

    // Go to the backend once to fetch the vacation's props:
    useEffect(() => {
        vacationsService.getOneVacation(vacationId)
            .then(vacation => {
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startingDate", vacation.startingDate);
                setValue("endingDate", vacation.endingDate);
                setValue("price", vacation.price);
            })
    }, []);

    // Execute the vacation editing when the form is submitted:
    async function send(vacation: VacationsModel) {
        try {
            vacation.vacationId = vacationId;
            console.log("send func - vacationId: ", vacationId);
            vacation.image = (vacation.image as unknown as FileList)[0]; // Convent to type File.
            await vacationsService.updateVacation(vacation);
            notifyService.success("Your vacation was updated.");
            navigate("/vacations-admin");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="UpdateVacation">

            <form onSubmit={handleSubmit(send)}>

                <Typography variant="h4" className="UpdateVacationHeader">
                    Update Vacation
                    <BrowserUpdatedIcon fontSize="small" />
                </Typography>
                <br />

                <TravelExplore className="UpdateVacationIcon" />
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

                <Description className="UpdateVacationIcon" />
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

                <FlightTakeoff className="UpdateVacationIcon" />
                <TextField
                    label="Starting Date" type="string"
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

                <FlightLand className="UpdateVacationIcon" />
                <TextField
                    label="Ending Date" type="string"
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

                <AttachMoney className="UpdateVacationIcon" />
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

                <Image className="UpdateVacationIcon" />
                <TextField label="Image" type="file"
                    {...register("image")}
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            shrink: "NoShrinkLabel"
                        }
                    }} />
                <br /><br />

                <Button type="submit" className="UpdateButton">Update</Button>

            </form>

        </div>
    );
}

export default UpdateVacation;
