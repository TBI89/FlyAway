import axios from "axios";
import appConfig from "../Utils/AppConfig";
import { FollowerActionObject, FollowerActionType, followerStore } from "../Redux/FollowersState";

class FollowersService {

    // Follow vacation:
    public async followVacation(userId: number, vacationId: number): Promise<void> {
        await axios.post(
            `${appConfig.followUrl}${userId}/${vacationId}/follow`
        );

        // You don't need to parse response data for 204 No Content

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

        // You don't need to parse response data for 204 No Content

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
