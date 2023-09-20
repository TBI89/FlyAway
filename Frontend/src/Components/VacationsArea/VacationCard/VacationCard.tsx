import { Favorite, FavoriteBorder } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import VacationsModel from '../../../Models/VacationsModel';
import { authStore } from '../../../Redux/AuthState';
import followersService from '../../../Services/FollowersService';
import notifyService from '../../../Services/NotifyService';
import './VacationCard.css';

interface VacationCardProps {
    vacation: VacationsModel;
}

export default function VacationCard({ vacation }: VacationCardProps): JSX.Element {

    // Local state for the cards and followers:
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [updatedFollowersCount, setUpdatedFollowersCount] = useState(vacation.followersCount);

    // Get access to our users info:
    const loggedInUser = authStore.getState().user;

    // Check if the vacation is in the liked vacations list from local storage:
    useEffect(() => {
        const likedVacations = JSON.parse(localStorage.getItem('likedVacations') || '[]');
        setIsLiked(likedVacations.includes(vacation.vacationId));
    }, [vacation.vacationId]);

    // By default the card won't display the vacation.description (unless the user clicks on it):
    const toggleCard = () => {
        setIsFlipped(!isFlipped);
    };

    // By default the like icon will be <FavoriteBorder/> (unless the user hovers over it):
    const toggleLike = async () => {
        try {
            setIsLiked(!isLiked);

            if (!isLiked) {
                // On hover, add the vacationId & userId to the "followers" table on the db:
                await followersService.followVacation(loggedInUser.userId, vacation.vacationId);
                notifyService.success('Vacation was added to your wishlist!');
            } else {
                // When hovering again, remove the vacationId & userId from "followers" table on the db:
                await followersService.unfollowVacation(loggedInUser.userId, vacation.vacationId);
                notifyService.success('Vacation was removed from your wishlist');
            }

            // Update the number of followers based on the user's activity using functional update:
            setUpdatedFollowersCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));

            // Update the likedVacations list in local storage after setting updatedFollowersCount:
            const likedVacations = JSON.parse(localStorage.getItem('likedVacations') || '[]');
            if (!isLiked) {
                likedVacations.push(vacation.vacationId);
            } else {
                const index = likedVacations.indexOf(vacation.vacationId);
                if (index !== -1) {
                    likedVacations.splice(index, 1);
                }
            }
            localStorage.setItem('likedVacations', JSON.stringify(likedVacations));
        } catch (err) {
            console.error('Toggle Like Error:', err);
            notifyService.error(err);
        }
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
        <Card className={`VacationCard ${isFlipped ? 'flipped' : ''}`} style={cardStyle} onClick={toggleCard}>
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
                        <CardActions>

                            {/* Display the appropriate icon to the user if he follows / unfollow a vacation: */}
                            <Button className='LikeButton' style={{ color: 'white' }} onMouseEnter={toggleLike}>
                                {isLiked ? (
                                    <Favorite />
                                ) : (
                                    <FavoriteBorder />
                                )}
                                Like {updatedFollowersCount}
                            </Button>
                        </CardActions>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
