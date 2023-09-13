
class VacationsModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startingDate: Date;
    public endingDate: Date;
    public price: number;
    public imageUrl: string; // imageName on the backend (have to change because of the backend sql query).
    public image: File;
    public followersCount: number;

}

export default VacationsModel;