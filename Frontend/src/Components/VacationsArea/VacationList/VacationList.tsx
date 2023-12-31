import { useEffect, useState } from "react";
import VacationsModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService"; // Corrected import path
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";
import { authStore } from "../../../Redux/AuthState";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../Utils/UseTitle";
import followersService from "../../../Services/FollowersService";
import { FollowerActionObject, FollowerActionType, followerStore } from "../../../Redux/FollowersState";
import Spinner from "../../SharedArea/Spinner/Spinner";

function VacationList(): JSX.Element {

    // Tab title:
    useTitle("Fly Away | Vacations");

    // States for vacation data & tracking page number:
    const [vacations, setVacations] = useState<VacationsModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filterByWishlist, setFilterByWishlist] = useState<VacationsModel[]>([]);
    const vacationsPerPage = 9; // Max number of cards displayed per page.
    const navigate = useNavigate(); // Redirect the admin to the VacationListAdmin component.
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    // Go to the backend once:
    useEffect(() => {

        // Check if there's a logged in user:
        const token = authStore.getState().token;
        if (!token) {
            notifyService.error("Please login first.");
            navigate("/login"); // If not, inform + redirect to login page.
            return;
        }

        const role = authStore.getState().user.roleId; // Get the user's role.
        if (role === 1) { // if he is an admin, notify him + navigate to the VacationListAdmin component.
            navigate("/vacations-admin");
        }
        // else: allow assess.

        const userId = authStore.getState().user.userId;
        vacationsService
            .getAllVacations(userId)
            .then(vacations => setVacations(vacations))
            .catch(err => notifyService.error(err));
    }, [isFollowing]);

    // Calculate the total number of pages:
    const totalPages = Math.ceil(vacations.length / vacationsPerPage);

    // Handling page navigation:
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Divide vacations into pages:
    const indexOfLastVacation = currentPage * vacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
    const currentVacations = vacations.slice(indexOfFirstVacation, indexOfLastVacation);

    // Filter 1: Display vacations that are on the user's wishlist:
    function displayByWishlist() {
        const userWishList = vacations.filter(v => v.isFollowing);

        // Check if the array is empty (explicit check)
        if (userWishList.length === 0) {
            notifyService.error("Your wish list is empty.");
        }
        setFilterByWishlist(userWishList);
    }

    // Filter 2: Display future vacations only:
    function displayFutureVacations() {
        const now = new Date();
        const currentDate = now.getTime();
        const futureVacations = vacations.filter(v => {
            const startingDate = new Date(v.startingDate).getTime();
            const endingDate = new Date(v.endingDate).getTime();
            return startingDate > currentDate && endingDate > currentDate;
        });

        if (futureVacations.length === 0) {
            notifyService.error("No vacations were found in the near future...");
        }

        setVacations(futureVacations);
    }

    // Filter 3: Display active vacations only (in the present):
    function displayActiveVacations() {
        const now = new Date();
        const currentDate = now.getTime();
        const activeVacations = vacations.filter(v =>
            new Date(v.startingDate).getTime() <= currentDate &&
            new Date(v.endingDate).getTime() >= currentDate
        );
        if (activeVacations.length === 0) notifyService.error("No active vacations were found...");
        setVacations(activeVacations);
    }

    // Function to reset filter and display all vacations:
    function resetFilters() {
        const userId = authStore.getState().user.userId;
        setFilterByWishlist([]);
        vacationsService
            .getAllVacations(userId)
            .then(vacations => setVacations(vacations))
            .catch(err => notifyService.error(err));
    }

    // Function to handle the number of followers (and update them) on each vacation:
    async function handleFollowersChange(vacationId: number) {
        try {
            // Follow or unfollow the vacation using the service
            if (!isFollowing) {
                await followersService.followVacation(authStore.getState().user.userId, vacationId);
                // Dispatch an action to increase follower count in Redux
                const action: FollowerActionObject = {
                    type: FollowerActionType.SetFollowerCount,
                    vacationId,
                    userId: authStore.getState().user.userId,
                    count: 1,
                };
                followerStore.dispatch(action);
            } else {
                await followersService.unfollowVacation(authStore.getState().user.userId, vacationId);
                // Dispatch an action to decrease follower count in Redux
                const action: FollowerActionObject = {
                    type: FollowerActionType.SetFollowerCount,
                    vacationId,
                    userId: authStore.getState().user.userId,
                    count: -1,
                };
                followerStore.dispatch(action);
            }

            // Update your local state or trigger any other necessary actions
            setIsFollowing(prevIsFollowing => !prevIsFollowing);
        }
        catch (err: any) {
            notifyService.error("Some error on update.");
        }
    }

    return (
        <div className="VacationList">

            {/* Filter / Un filter vacations: */}
            <div>
                <button className="FilterButton" onClick={displayByWishlist}>My Wishlist</button>
                <button className="FilterButton" onClick={displayFutureVacations}>Future Vacations</button>
                <button className="FilterButton" onClick={displayActiveVacations}>Active Vacations</button>
                <button className="FilterButton" onClick={resetFilters}>All Vacations</button>
            </div>

            {/* Display a spinner until the vacations displayed: */}
            {vacations.length === 0 && <Spinner />}

            {/* Render vacation cards for the current page: */}
            {
                filterByWishlist.length > 0
                    ? filterByWishlist.map(v => (
                        <VacationCard
                            key={v.vacationId}
                            vacation={v}
                            isFollowing={v.isFollowing}
                            userId={authStore.getState().user.userId}
                            onFollowChange={() => { handleFollowersChange(v.vacationId) }}
                        />
                    ))
                    : currentVacations.map(v => (
                        <VacationCard
                            key={v.vacationId}
                            vacation={v}
                            isFollowing={v.isFollowing}
                            userId={authStore.getState().user.userId}
                            onFollowChange={() => { handleFollowersChange(v.vacationId) }}
                        />
                    ))
            }

            {/* Pagination section */}
            <div className="Pagination">
                {/* Generate pagination buttons */}
                {filterByWishlist.length > 0 && currentVacations.length < vacationsPerPage
                    ? null
                    : Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`PaginationButton ${currentPage === index + 1 ? "active" : ""}`}
                        >
                            {/* Display the page number on each button */}
                            {index + 1}
                        </button>
                    ))}
            </div>


        </div>
    );
}

export default VacationList;