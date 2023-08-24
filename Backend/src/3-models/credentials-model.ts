import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel {

    // Model:
    public email: string;
    public password: string;

    // Copy constructor:
    public constructor(user: CredentialsModel) {
        this.email = user.email;
        this.password = user.password
    }

    // Validation schema:
    private static validationSchema = Joi.object({
        email: Joi.string().required().min(10).max(40), // ADD CUSTOM EMAIL VALIDATION
        password: Joi.string().required().min(4).max(20)
    });

    // Validate properties:
    public validate(): void {
        const result = CredentialsModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default CredentialsModel;