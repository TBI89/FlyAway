import VacationsModel from "../../../Models/VacationsModel";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationsModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    // Extract vacations props:
    const { vacation } = props;
    console.log(props.vacation.imageName);
    

    // Reformat date for react to support:
    const startingDate = new Date(vacation.startingDate).toDateString();
    const endingDate = new Date(vacation.endingDate).toDateString();

    return (
        <div className="VacationCard">
            <div>
                Destination: {props.vacation.destination}
                <br />
                Description: {props.vacation.description}
                <br />
                Starting Date: {startingDate}
                <br />
                Ending Date: {endingDate}
                <br />
                Price: {props.vacation.price}
                <br />
                <div>
                    <img src={props.vacation.imageName} />
                </div>
            </div>
        </div>
    );
}

export default VacationCard;
