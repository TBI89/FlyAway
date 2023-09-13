import VacationsModel from "../../../Models/VacationsModel";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationsModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    // Extract vacations props:
    const { vacation } = props;

    // Reformat date for react to support:
    const startingDate = new Date(vacation.startingDate).toDateString();
    const endingDate = new Date(vacation.endingDate).toDateString();

    // Display price in dollars & 2 digits after the dot:
    function displayPrice(price: number): string {
        return `$${price.toFixed(2)}`;
    }

    return (
        <div className="VacationCard">
            <div>
                <div>
                    <img className="ImageCard" src={props.vacation.imageUrl} />
                </div>
                {startingDate}
                <br />
                {endingDate}
                <br />
                {props.vacation.destination}
                <br />
                {props.vacation.description}
                <br />
                {displayPrice(+props.vacation.price)}
            </div>
        </div>
    );
}

export default VacationCard;
