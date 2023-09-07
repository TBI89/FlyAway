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
    private static validationSchema = Joi.object({// Using trim + empty funcs to prevent whitespace usage.
        email: Joi.string().required().trim().email().max(40).empty(false),
        password: Joi.string().required().trim().min(4).max(300).empty(false)
    });

    // Validate properties:
    public validate(): void {
        const result = CredentialsModel.validationSchema.validate(this);
        if (result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default CredentialsModel;