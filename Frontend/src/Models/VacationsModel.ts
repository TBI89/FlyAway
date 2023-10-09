
class VacationsModel {

    // Model:
    public vacationId: number;
    public destination: string;
    public description: string;
    public startingDate: string;
    public endingDate: string;
    public price: number;
    public imageUrl: string;
    public image: File;
    public followersCount: number;
    public isFollowing: boolean;

    // Custom validation for vacation properties:
    public static destinationValidation = {
        required: { value: true, message: "Please enter the destination." },
        maxLength: { value: 30, message: "Destination can't contain more then 30 characters." },
        validate: (value: string) => { // Validate the destination doesn't contain only spaces, tabs etc.
            const trimmedValue = value.trim();
            return trimmedValue ? true : "First name cannot be empty or contain only spaces.";
        }
    }

    public static descriptionValidation = {
        required: { value: true, message: "Please enter the description." },
        maxLength: { value: 1000, message: "Description can't contain more then 1000 characters." },
        validate: (value: string) => { // Validate the description doesn't contain only spaces, tabs etc.
            const trimmedValue = value.trim();
            return trimmedValue ? true : "Description cannot be empty or contain only spaces.";
        }
    }

    public static startingDateValidation = {
        required: { value: true, message: "Please select a starting date." },
        validate: (value: string, allValues: any) => {

            // Extract the "endingDate" from the "allValues" object:
            const endingDate: string = allValues.endingDate;

            // Check if "endingDate" exists and "startingDate" is greater than "endingDate":
            if (endingDate && value > endingDate) {

                // If "startingDate" is after "endingDate", return an err message"
                return "Starting date must come before the ending date.";
            }
            return true; // Else: startingDate passed.
        }
    }

    public static endingDateValidation = {
        required: { value: true, message: "Please select an ending date." },
    }

    public static priceValidation = {
        required: { value: true, message: "Please enter the vacation's price." },
        min: { value: 0, message: "Price can't be less then 0." },
        max: { value: 9999, message: "Price can't be more then 9,999." }
    }

    public static imageValidation = {
        required: { value: true, message: "Please upload the vacation's image." }
    }

}

export default VacationsModel;