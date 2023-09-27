import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import VacationsModel from '../../../Models/VacationsModel';
import './VacationCardAdmin.css';

interface VacationCardAdminProps {
    vacation: VacationsModel;
}

export default function VacationCardAdmin({ vacation }: VacationCardAdminProps): JSX.Element {

    // Local state for the cards:
    const [isFlipped, setIsFlipped] = useState(false);

    // By default the card won't display the vacation.description (unless the user clicks on it):
    const toggleCard = () => {
        setIsFlipped(!isFlipped);
    };

    // Reformat vacation dates to readable ones:
    const startingDate = new Date(vacation.startingDate).toDateString();
    const endingDate = new Date(vacation.endingDate).toDateString();

    // Price format:
    function displayPrice(price: number): string {
        return `$${price.toFixed(2)}`;
    }

    const cardStyle = {
        backgroundImage: `url(${vacation.imageUrl})`,
    };

    return (

        // When the user clicks the card, display the vacation description (on the next click, display again the other props):
        <Card className={`VacationCardAdmin ${isFlipped ? 'flipped' : ''}`} style={cardStyle} onClick={toggleCard}>
            <CardContent>
                {isFlipped ? (
                    <div className={`card-content back`}>
                        <Typography variant="body1">{vacation.description}</Typography>
                    </div>
                ) : (
                    <div className={`card-content front`}>
                        <Typography variant="body1">{startingDate}</Typography>
                        <Typography variant="body1">{endingDate}</Typography>
                        <Typography variant="h6" fontWeight="bold">{vacation.destination}</Typography>
                        <Typography variant="h6" className="Price">
                            {displayPrice(+vacation.price)}
                        </Typography>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
