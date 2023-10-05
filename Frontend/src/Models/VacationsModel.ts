
class VacationsModel {

    // Model:
    public vacationId: number;
    public destination: string;
    public description: string;
    public startingDate: Date;
    public endingDate: Date;
    public price: number;
    public imageUrl: string;
    public image: File;
    public followersCount: number;

    // Custom validation for vacation properties:
    public static destinationValidation = {
        required: { value: true, message: "Please enter the destination." },
        maxLength: { value: 30, message: "Destination can't contain more then 30 characters." }
    }

    public static descriptionValidation = {
        required: { value: true, message: "Please enter the description." },
        maxLength: { value: 1000, message: "Description can't contain more then 1000 characters." }
    }

    public static startingDateValidation = {
        required: { value: true, message: "Please select a starting date." },
        validate: (value: Date, allValues: any) => {

            // Extract the "endingDate" from the "allValues" object:
            const endingDate: Date = allValues.endingDate;

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