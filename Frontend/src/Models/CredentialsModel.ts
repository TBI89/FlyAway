
class CredentialsModel {

    // Model:
    public email: string;
    public password: string;

    // Custom prop validation:
    public static emailValidation = {
        required: { value: true, message: "Please enter your email address." },
        pattern: { // Check that the email format is a valid one.
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Please enter a valid email address.",
        },
        maxLength: { value: 40, message: "Email can contain maximum 40 chars." },
        validate: (value: string) => {
            const trimmedValue = value.trim();
            return trimmedValue ? true : "Email cannot be empty or contain only spaces."
        }
    }
    public static passwordValidation = {
        required: { value: true, message: "Please enter your password" },
        minLength: { value: 4, message: "Password must contain minimum of 4 chars." },
        validate: (value: string) => {
            const trimmedValue = value.trim();
            return trimmedValue ? true : "Password cannot be empty or contain only spaces."
        }
    }
}

export default CredentialsModel;