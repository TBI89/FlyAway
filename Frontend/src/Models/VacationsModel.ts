
class VacationsModel {

    // Model:
    public vacationId: number;
    public destination: string;
    public description: string;
    public startingDate: Date;
    public endingDate: Date;
    public price: number;
    public imageUrl: string; // imageName on the backend (have to change because of the backend sql query).
    public image: File;
    public followersCount: number;

    // Custom validation for vacation properties:
    public static destinationValidation = {
        required: {value: true, message: "Please enter the destination."},
        maxLength: {value: 30, message: "Destination can't contain more then 30 characters."}
    }

    public static descriptionValidation = {
        required: {value: true, message: "Please enter the description."},
        maxLength: {value: 30, message: "Description can't contain more then 1000 characters."}
    }

    public static startingDateValidation = {
        required: {value: true, message: "Please select a starting date."},
        // Add validation so staring date can't come after ending date.
    }

    public static endingDateValidation = {
        required: {value: true, message: "Please select an ending date."},
        // Add validation so ending date can't come before starting date.
    }

    public static priceValidation = {
        required: {value: true, message: "Please enter the vacation's price."},
        min: {value: 0, message: "Price can't be less then 0."},
        max: {value: 9999, message: "Price can't be more then 9,999."}
    }

    public static imageValidation = {
        required: {value: true, message: "Please upload the vacation's image."}
    }

}

export default VacationsModel;