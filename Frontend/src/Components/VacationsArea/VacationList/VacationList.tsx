import { useEffect, useState } from "react";
import VacationsModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService"; // Corrected import path
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

function VacationList(): JSX.Element {

    // States for vacation data & tracking page number:
    const [vacations, setVacations] = useState<VacationsModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filterByWishlist, setFilterByWishlist] = useState<VacationsModel[]>([]);
    const vacationsPerPage = 9; // Max number of cards displayed per page.

    // Go to the backend once:
    useEffect(() => {
        vacationsService
            .getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notifyService.error(err));
    }, []);

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
        const likedVacations = JSON.parse(localStorage.getItem("likedVacations") || "[]");
        const filteredVacations = vacations.filter(v => likedVacations.includes(v.vacationId));
        if (filteredVacations.length === 0) notifyService.error("Your wishlist is empty \n hover over the 'Like' to fill it up!");
        setFilterByWishlist(filteredVacations);
    }

    // Filter 2: Display future vacations only:
    function displayFutureVacations() {
        const now = new Date();
        const currentDate = now.getTime();
        const futureVacations = vacations.filter(v => new Date(v.endingDate).getTime() > currentDate);
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
        setVacations(activeVacations);
    }

    // Function to reset filter and display all vacations:
    function resetFilters() {
        setFilterByWishlist([]);
        vacationsService
            .getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notifyService.error(err));
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

            {/* Render vacation cards for the current page: */}
            {
                filterByWishlist.length > 0

                    ? filterByWishlist.map(v => (
                        <VacationCard key={v.vacationId} vacation={v} />
                    ))

                    : currentVacations.map(v => (
                        <VacationCard key={v.vacationId} vacation={v} />
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