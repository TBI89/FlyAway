import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import VacationsModel from '../../../Models/VacationsModel';
import './VacationCard.css';

interface VacationCardProps {
    vacation: VacationsModel;
}

export default function VacationCard({ vacation }: VacationCardProps): JSX.Element {
    // Reformat the date object to a readable version (that's supported by React Node):
    const startingDate = new Date(vacation.startingDate).toDateString();
    const endingDate = new Date(vacation.endingDate).toDateString();

    // Show the prices in a dollars format + 2 digits after the dot:
    function displayPrice(price: number): string {
        return `$${price.toFixed(2)}`;
    }

    // Set the imageUrl as the card background image:
    const cardStyle = {
        backgroundImage: `url(${vacation.imageUrl})`,
    };

    return (
        <Card className="VacationCard" style={cardStyle}>
            <CardContent>
                <div className="CardOverlay">
                    <Typography variant="body1">{startingDate}</Typography>
                    <Typography variant="body1">{endingDate}</Typography>
                    <Typography variant="h6">{vacation.destination}</Typography>
                    <Typography variant="body1">{vacation.description}</Typography>
                    <Typography variant="h6" className="Price">
                        {displayPrice(+vacation.price)}
                    </Typography>
                    <CardActions>
                        <Button style={{color:"white"}}>
                            {<FavoriteBorderIcon />}
                            Like {vacation.followersCount}
                        </Button>
                    </CardActions>
                </div>
            </CardContent>
        </Card>
    );
}
