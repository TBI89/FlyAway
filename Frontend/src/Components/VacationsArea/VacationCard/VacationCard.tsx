import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useState } from 'react';
import VacationsModel from '../../../Models/VacationsModel';
import './VacationCard.css';

interface VacationCardProps {
    vacation: VacationsModel;
}

export default function VacationCard({ vacation }: VacationCardProps): JSX.Element {

    // State to track whether the card is flipped or not:
    const [isFlipped, setIsFlipped] = useState(false);

    // State to track if the current logged in user likes vacationId:
    const [isLiked, setIsLiked] = useState(false);

    // Function to toggle the card flip state:
    const toggleCard = () => {
        setIsFlipped(!isFlipped);
    };

    // Function to toggle the like icon:
    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    // Format the starting and ending dates:
    const startingDate = new Date(vacation.startingDate).toDateString();
    const endingDate = new Date(vacation.endingDate).toDateString();

    // Function to format and display the price:
    function displayPrice(price: number): string {
        return `$${price.toFixed(2)}`;
    }

    // Style for the card background image:
    const cardStyle = {
        backgroundImage: `url(${vacation.imageUrl})`,
    };

    return (

        // Card component with conditional class based on flip state:
        <Card className={`VacationCard ${isFlipped ? 'flipped' : ''}`} style={cardStyle} onClick={toggleCard}>
            <CardContent>
                {isFlipped ? (

                    // Back of the card - Display only the description
                    <div className={`card-content back`}>
                        <Typography variant="body1">{vacation.description}</Typography>
                    </div>
                ) : (

                    // Front of the card - Display front content:
                    <div className={`card-content front`}>
                        <Typography variant="body1">{startingDate}</Typography>
                        <Typography variant="body1">{endingDate}</Typography>
                        <Typography variant="h6" fontWeight="bold">{vacation.destination}</Typography>
                        <Typography variant="h6" className="Price">
                            {displayPrice(+vacation.price)}
                        </Typography>
                        <CardActions>
                            <Button className='LikeButton' style={{ color: 'white' }} onMouseEnter={toggleLike}>
                                {isLiked ? (
                                    <Favorite />
                                ) : (
                                    <FavoriteBorder />
                                )}
                                Like {vacation.followersCount}
                            </Button>
                        </CardActions>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}