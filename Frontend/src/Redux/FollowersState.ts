import { createStore } from "redux";

// 1. Global state:
export class FollowerState {
    public followerCounts: { [vacationId: number]: number } = {};
    public usersFollowVacations: { [userId: number]: number[] } = {};
}

// 2. Action type:
export enum FollowerActionType {
    SetFollowerCount = "SetFollowerCount",
    UsersFollowVacations = "UsersFollowVacations",
    UnfollowVacation = "UnfollowVacation"
}

// 3. Action object:
export interface FollowerActionObject {
    type: FollowerActionType;
    vacationId: number;
    userId: number;
    count: number;
}

// 4. Reducer:
export function followerReducer(currentState = new FollowerState(), action: FollowerActionObject): FollowerState {

    // Create a new state (clone the current one and add to it):
    const newState = { ...currentState };

    switch (action.type) {
        case FollowerActionType.SetFollowerCount:
            newState.followerCounts[action.vacationId] = action.count;
            break;
        case FollowerActionType.UnfollowVacation:
            // Update the follower count when a user unfollows a vacation:
            if (newState.followerCounts[action.vacationId] > 0) {
                newState.followerCounts[action.vacationId] -= 1;
            }
            // Extract the userId from the action:
            const userId = action.userId;

            // Check if the user is already following vacations:
            if (newState.usersFollowVacations[userId]) {
                // Filter the array of vacationIds for the user to remove the unfollowed vacation:
                newState.usersFollowVacations[userId] = newState.usersFollowVacations[userId].filter(
                    vacationId => vacationId !== action.vacationId
                );
            }
            break;
    }

    return newState;
}

// 5. Store:
export const followerStore = createStore(followerReducer);
