import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";
class VacationsModel {

    // Model:
    public vacationId: number;
    public destination: string;
    public description: string;
    public startingDate: string;
    public endingDate: string;
    public price: number;
    public imageName: string;
    public image: UploadedFile;

    // Copy constructor:
    public constructor(vacation: VacationsModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startingDate = vacation.startingDate;
        this.endingDate = vacation.endingDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
    }

    // Validation schema:
    private static validationSchema = Joi.object({
        vacationId: Joi.number().optional().integer().positive(),
        destination: Joi.string().required().trim().max(30).empty(false),
        description: Joi.string().required().trim().max(1000).empty(false),
        startingDate: Joi.date()
        .required()
        .less(Joi.ref("endingDate")), // Validate the startingDate comes before endingDate. 
        endingDate: Joi.date().required(), 
        price: Joi.number().required().positive().max(9999),
        imageName: Joi.string().optional().max(50),
        image: Joi.object().optional()
    });

    // Validate properties:
    public validate(): void {
        const result = VacationsModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message) // Throw 400 if not valid.
    }
}

export default VacationsModel;