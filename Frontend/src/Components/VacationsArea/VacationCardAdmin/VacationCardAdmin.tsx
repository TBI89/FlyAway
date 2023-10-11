import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import VacationsModel from '../../../Models/VacationsModel';
import notifyService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/VacationsService';
import './VacationCardAdmin.css';

interface VacationCardAdminProps {
    vacation: VacationsModel;
    removeVacation: (vacationId: number) => Promise<void>;
}

export default function VacationCardAdmin({ vacation, removeVacation }: VacationCardAdminProps): JSX.Element {

    // Local state for the card UI & vacation obj:
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

    async function handleRemoveVacation(): Promise<void> {
        try {
            const verifyAction = window.confirm("Are you sure you want to remove this vacation?");
            if (!verifyAction) return;
            await removeVacation(vacation.vacationId);
            notifyService.success("Vacation removed.");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

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
                        <div className='IconContainer'>
                        <Button onClick={handleRemoveVacation}><DeleteIcon className="AdminCardIcon" /></Button>
                        <NavLink to={"/vacations/update/" + vacation?.vacationId}><EditIcon className="AdminCardIcon" /></NavLink>
                        </div>
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
