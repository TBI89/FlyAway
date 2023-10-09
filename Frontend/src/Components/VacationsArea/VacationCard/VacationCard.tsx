import { Favorite, FavoriteBorder } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import VacationsModel from '../../../Models/VacationsModel';
import followersService from '../../../Services/FollowersService';
import notifyService from '../../../Services/NotifyService';
import './VacationCard.css';

interface VacationCardProps {
    vacation: VacationsModel;
    isFollowing: boolean;
    userId: number;
    onFollowChange: () => void; // Callback to update parent component when follow status changes.
}

export default function VacationCard({ vacation, isFollowing, userId, onFollowChange }: VacationCardProps): JSX.Element {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLiked, setIsLiked] = useState(isFollowing);
    const [updatedFollowersCount, setUpdatedFollowersCount] = useState(vacation.followersCount);

    const toggleCard = () => {
        setIsFlipped(!isFlipped);
    };

    const toggleLike = async () => {

        try {
            setIsLiked(!isLiked);

            const vacationId = vacation.vacationId; // Get the vacation's ID

            if (!isLiked) {
                await followersService.followVacation(userId, vacationId);
                notifyService.success('Vacation was added to your wishlist!');
            } else {
                await followersService.unfollowVacation(userId, vacationId);
                notifyService.success('Vacation was removed from your wishlist');
            }

            setUpdatedFollowersCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));

            // Call the callback to notify the parent component about the follow status change:
            onFollowChange();

        } catch (err) {
            console.error('Toggle Like Error:', err);
            notifyService.error(err);
        }
    };

    const startingDate = new Date(vacation.startingDate).toDateString();
    const endingDate = new Date(vacation.endingDate).toDateString();

    function displayPrice(price: number): string {
        return `$${price.toFixed(2)}`;
    }

    const cardStyle = {
        backgroundImage: `url(${vacation.imageUrl})`,
    };

    return (
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
