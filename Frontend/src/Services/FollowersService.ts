import axios from "axios";
import appConfig from "../Utils/AppConfig";
import { FollowerActionObject, FollowerActionType, followerStore } from "../Redux/FollowersState";

class FollowersService {

    // Follow vacation:
    public async followVacation(userId: number, vacationId: number): Promise<void> {
        const response = await axios.post<string>(
            `${appConfig.vacationsUrl}${vacationId}/follow`,
            { userId, vacationId });

        // Parse the response data as JSON:
        const responseData = JSON.parse(response.data);

        // Extract the updated follower count from the parsed data:
        const updatedFollowerCount = responseData.followerCount;

        // Dispatch an action to update the follower count in Redux:
        const action: FollowerActionObject = {
            type: FollowerActionType.SetFollowerCount,
            vacationId,
            userId, 
            count: updatedFollowerCount
        };
        followerStore.dispatch(action);
    }

    // Unfollow vacation:
    public async unfollowVacation(userId: number, vacationId: number): Promise<void> {
        const response = await axios.delete<string>(
            `${appConfig.vacationsUrl}${vacationId}/unfollow`,
            { data: { userId, vacationId } }
        );

        // Parse the response data as JSON:
        const responseData = JSON.parse(response.data);

        // Extract the updated follower count from the parsed data:
        const updatedFollowerCount = responseData.followerCount;

        // Dispatch an action to update the follower count in Redux:
        const action: FollowerActionObject = {
            type: FollowerActionType.SetFollowerCount,
            vacationId,
            userId,
            count: updatedFollowerCount
        };
        followerStore.dispatch(action);
    }
}

export default FollowersService;
