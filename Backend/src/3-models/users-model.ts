import Joi from "joi";
import { ValidationError } from "./client-errors";
import RolesModel from "./roles-model";

class UsersModel {

    // Model:
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RolesModel;

    // Copy constructor:
    public constructor(user: UsersModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    // Validation schema:
    private static validationSchema = Joi.object({
        userId: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(30),
        email: Joi.string().required().min(10).max(40), // CHECK FOR CUSTOM EMAIL VALIDATION.
        password: Joi.string().required().min(4).max(20),
        roleId: Joi.number().required().positive().integer().max(2)
    });

    // Validate properties:
    public validate(): void {
        const result = UsersModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message) // Throw 400 if not valid.
    }
}

export default UsersModel;