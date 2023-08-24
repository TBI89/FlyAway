import Joi from "joi";
import { ValidationError } from "./client-errors";
class VacationsModel {

    // Model:
    public vacationId: number;
    public destination: string;
    public description: string;
    public startingDate: Date;
    public endingDate: Date;
    public price: number;
    public imageName: string;

    // Copy constructor:
    public constructor(vacation: VacationsModel) {
        this.vacationId = vacation.vacationId;
        this.description = vacation.destination;
        this.description = vacation.description;
        this.startingDate = vacation.startingDate;
        this.endingDate = vacation.endingDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
    }

    // Validation schema:
    private static validationSchema = Joi.object({
        vacationId: Joi.number().optional().integer().positive(),
        destination: Joi.string().required().max(30),
        description: Joi.string().required().max(1000),
        startingDate: Joi.date().required(), // ADD VALIDATION (cant be after ending date)
        endingDate: Joi.date().required(), // ADD VALIDATION (cant be before starting date)
        price: Joi.number().required().positive().max(9999),
        imageName: Joi.string().required().max(50)
    });

    // Validate properties:
    public validate(): void {
        const result = VacationsModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message) // Throw 400 if not valid.
    }
}

export default VacationsModel;
