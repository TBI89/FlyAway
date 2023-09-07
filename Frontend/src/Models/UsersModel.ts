import RolesModel from "./RolesModel";

class UsersModel {

    // Model:
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RolesModel;

    // Custom validation to user properties:
    public static firstNameValidation = {
        required: {value: true, message: "Please enter your first name."},
        minLength: {value: 2, message: "First name must contain minimum 2 chars."},
        maxLength: {value: 20, message: "First name can't contain more then 20 chars."},
        validate: (value: string) => { // Validate the first name doesn't contain only spaces, tabs etc.
            const trimmedValue = value.trim();
            return trimmedValue ? true : "First name cannot be empty or contain only spaces.";
        }
    }

    public static lastNameValidation = {
        required: {value: true, message: "Please enter your last name."},
        minLength: {value: 2, message: "Last name must contain minimum 2 chars."},
        maxLength: {value: 30, message: "Last name can't contain more then 30 chars."},
        validate: (value: string) => { // Validate the last name doesn't contain only spaces, tabs etc.
            const trimmedValue = value.trim();
            return trimmedValue ? true : "Last name cannot be empty or contain only spaces.";
        }
    }

    public static emailValidation = {
        required: {value: true, message: "Please enter your email address."},
        pattern: { // Check that the email format is a valid one.
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Please enter a valid email address.",
        },
        maxLength: {value: 40, message: "Email can contain maximum 40 chars."},
        validate: (value: string) => { // Validate the email doesn't contain only spaces, tabs etc.
            const trimmedValue = value.trim();
            return trimmedValue ? true : "Email cannot be empty or contain only spaces.";
        } 
    }

    public static passwordValidation = {
        required: {value: true, message: "Please enter your password."},
        minLength: {value: 4, message: "First name must contain minimum 4 chars."},
        maxLength: {value: 300, message: "Password can't contain more then 300 chars."},
        validate: (value: string) => { // Validate the password doesn't contain only spaces, tabs etc.
            const trimmedValue = value.trim();
            return trimmedValue ? true : "Password cannot be empty or contain only spaces.";
        }
    }

}

export default UsersModel;