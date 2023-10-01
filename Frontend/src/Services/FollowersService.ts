import axios from "axios";
import appConfig from "../Utils/AppConfig";
import { FollowerActionObject, FollowerActionType, followerStore } from "../Redux/FollowersState";

class FollowersService {

    // Follow vacation:
    public async followVacation(userId: number, vacationId: number): Promise<void> {
        await axios.post(
            `${appConfig.followUrl}${userId}/${vacationId}/follow`
        );

        // Dispatch an action to update the follower count in Redux with a default count of 0:
        const action: FollowerActionObject = {
            type: FollowerActionType.SetFollowerCount,
            vacationId,
            userId,
            count: 0, // Set to the desired value if needed
        };
        followerStore.dispatch(action);
    }

    // Unfollow vacation:
    public async unfollowVacation(userId: number, vacationId: number): Promise<void> {
        await axios.delete(
            `${appConfig.followUrl}${userId}/${vacationId}/unfollow`
        );

        // Dispatch an action to update the follower count in Redux with a default count of 0:
        const action: FollowerActionObject = {
            type: FollowerActionType.SetFollowerCount,
            vacationId,
            userId,
            count: 0, // Set to the desired value if needed
        };
        followerStore.dispatch(action);
    }
}

const followersService = new FollowersService();

export default followersService;
